import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { GeneralService } from './core/services/general.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  lang = this.gs.language;
  constructor(private translate: TranslateService, private gs: GeneralService) {
    translate.addLangs(environment.languages);
    translate.setDefaultLang(environment.defaultLang);
    translate.use(this.lang);
  }
}
