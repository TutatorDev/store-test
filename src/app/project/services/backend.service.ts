import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { db } from './localdb.service';
import { isNil, map, maxBy, negate, pickBy } from "lodash-es";

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  async CheckConnection() {
    try {
      const r = await this.http.get('zinc/check-connection').toPromise();
      return r;
    } catch (error) {
      return { ok: false };
    }
  }

  async SyncCatalogs() {
    try {
      const to = await db.catalogs.toArray();
      const last = maxBy(to, 'updatedAt') ?? { updatedAt: 0 };
      const res: any = await firstValueFrom(this.http
        .post('zinc/sync-catalog', { last_update: last.updatedAt }));
      const s = await db.catalogs.bulkPut(res);
      return res.length;
    } catch (e) {
      return -1;
    }
  }

  async SyncCore() {
    try {
      const c = await this.SyncCatalogs();
      return [
        { table: 'Catalogs', resp: c },
      ];
    } catch (e) {
      return [];
    }
  }

  async SyncTable(table: string) {
    try {
      const toSend = await db
        .table(table)
        .where('sync')
        .equals(1)
        .sortBy('updatedAt');
      const d =  map(toSend, obj => pickBy(obj, negate(isNil)));
      const data = await db.table(table).toArray();
      const last = maxBy(data, 'updatedAt') ?? { updatedAt: 0 };
      console.log(table, d);
      const sync = { model: table, last_update: last.updatedAt, data: d };
      const ver: any = await this.http
        .post('Zinc/sync-table', sync)
        .toPromise();
      if (ver.length > 0) {
        const s = await db.table(table).bulkPut(ver);
      }
      return ver.length;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
