import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  @Output() OnlineChanged = new EventEmitter();
  @Output() SyncChanged = new EventEmitter();
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private translate: TranslateService,
  ) {

  }

  // LOADER METHODS
  showLoader() {
      this.isLoadingSubject.next(true);
  }

  hideLoader() {
    setTimeout(() => {
      this.isLoadingSubject.next(false);
    }, 150);
  }

  get language() {
    return localStorage.getItem(environment.appCode + '.lang') ?? environment.defaultLang;
  }

  get userId() {
    return localStorage.getItem(environment.appCode + '.userId') ?? '-1';
  }

  get user() {
    const u = JSON.parse(localStorage.getItem(environment.appCode + '.user') ?? '{}');
    delete u['roleMapping'];
    return u;
  }

  networkStatus(): Observable<boolean> {
      return merge(
        of(null),
        fromEvent(window, 'online'),
        fromEvent(window, 'offline')
      ).pipe(map(() => navigator.onLine));
  }

  ScreenSize(): Observable<string> {
    // Lógica para determinar el tamaño de la pantalla (puedes ajustar según tus necesidades)
    return merge(
      of(null),
      fromEvent(window, 'resize').pipe(delay(300))
    ).pipe(map(() => {
      const width = window.innerWidth;
      if (width < 640) {
        return 'sm';
      } else if (width < 768) {
        return 'md';
      } else {
        return 'lg';
      }
    }));
  }

  setLanguaje(lang: string) {
    localStorage.setItem(environment.appCode + '.lang', lang);
    this.translate.use(lang);
  }

  public get OnlineMode() {
    const menu = localStorage.getItem(environment.appCode + '.offline') ?? 'false';
    return menu;
  }


  public get SyncStatus() {
    const s = localStorage.getItem(environment.appCode + '.syncstatus');
    return (s == '1') ? true : false;
  }

  changeSyncStatus(isSync: string) {
    localStorage.setItem(environment.appCode + '.syncstatus', isSync);
    this.SyncChanged.next((isSync == '1') ? true : false);
  }

  changeOnline(isOnline: boolean) {
    this.OnlineChanged.next(isOnline);
    localStorage.setItem(environment.appCode + '.offline', JSON.stringify(isOnline));
  }

}
