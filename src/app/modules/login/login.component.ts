import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ZnFormsModule } from '../../core/zn30-core-forms/zn-forms.module';
import { TranslateModule } from '@ngx-translate/core';
import { ZnFieldType } from '../../core/zn30-core-forms/zn-forms.interface';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from '../../core/services/general.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ToastModule, MessagesModule, ZnFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  fields: ZnFieldType[] = [
    {
      key: 'userName',
      type: 'input',
      label: 'Username',
      validators: { required: true },
      defaultColor: true,
    },
    {
      key: 'password',
      type: 'password',
      label: 'Password',
      validators: { required: true },
      defaultColor: true,
    },
  ];
  data: any = {};
  showValidations: boolean = false;
  platformVersion = environment.platformVersion;
  online = this.gs.OnlineMode == 'true' ? true : false;
  constructor(
    private authSer: AuthService,
    private messageService: MessageService,
    private route: Router,
    private gs: GeneralService
  ) {
    this.authSer.logout();
  }

  fchange(data: any) {
    this.data = data;
  }

  login() {
    if (this.data?.isValid) {
      this.offlineMode();
      this.authSer
        .signIn(this.data.data.userName, this.data.data.password)
        .then((r: any) => {
          if (r.auth) {
            this.route.navigate(['home/']);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: "User or password doesn't match",
            });
          }
        });
    } else {
      this.showValidations = true;
    }
  }

  isEnterKeyPressed() {
    this.login();
  }

  offlineMode() {
    this.gs.changeOnline(this.online);
  }
}
