import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { AES, enc } from 'crypto-js';
import { db } from '../../project/services/localdb.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  sK = environment.ekey;
  constructor(private http: HttpClient, private gs: GeneralService) {
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem(environment.appCode + '.token') || false;
    const user = localStorage.getItem(environment.appCode + '.user') || false;
    return token && user ? true : false;
  }

  // Sign in with email/password
  signIn(username: string, password: string): Promise<any> {
    return this.http.post('login', {username, password}).toPromise().then(async (r: any) => {
      if(r && r.user) {
        let u= {
                    id: r.user.id,
                    first_name: r.user.firstName,
                    last_name: r.user.lastName,
                    email: r.user.email,
                    username: username,
                    password: password,
                    offices: r.user.offices,
                    roles: r.user.roles
                  };
        await this.insertUser(u);
        u.password = '--??--';
        this.setUser(r.id, u);
        return {online: true, auth: true};
      } else {
        return {online: true, auth: false};
      }
    }, (e: any) => {
      if(e.status == 401) {
        return {online: true, auth: false};
      } else {
          return this.directLogin(username, password);
      }
    });
  }

  // Sign in offline
  async directLogin(username: string, password: string) {
    try {
      const u = await db.offlineUser.where('username').equals(username).first();
      if (u && u.password) {
        const vpassword = this.decrypt(u?.password ?? '');
        if (vpassword == password) {
          u.password = '--??--';
          this.setUser('-1', u);
          return { online: false, auth: true };
        } else {
          return { online: false, auth: false };
        }
      } else {
        return { online: false, auth: false };
      }
    } catch (error) {
      return { online: false, auth: false };
    }
  }

  encrypt(value: string): string {
    return AES.encrypt(value, this.sK.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    return AES.decrypt(textToDecrypt, this.sK.trim()).toString(enc.Utf8);
  }

  async insertUser(data: any) {
    try {
      data.password = this.encrypt(data.password);
      const u = await db.offlineUser.put(data);
      return u;
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }

  async getUser(id: string) {
    try {
      const resp = await db.offlineUser.get(id);
      resp!.password = this.decrypt(resp?.password ?? '');
      return resp;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  setUser(token: string, user: any) {
    localStorage.setItem(environment.appCode + '.userId', user.id);
    localStorage.setItem(environment.appCode + '.user', JSON.stringify(user));
    localStorage.setItem(environment.appCode + '.token', token);
  }

  // Sign out
  logout() {
    localStorage.removeItem(environment.appCode + '.token');
    localStorage.removeItem(environment.appCode + '.user');
  }
}
