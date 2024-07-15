import { inject, Injectable } from "@angular/core";
import { CatalogsStore } from "./catalogs.store";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

const CATALOGS = [
  {
    value: 3,
    label: 'TEST 3',
    catalogCode: 'TEST',
    lang: 'en',
  },
  {
    value: 2,
    label: 'TEST 2',
    catalogCode: 'TEST',
    lang: 'en',
  },
  {
    value: 1,
    label: 'TEST 1',
    catalogCode: 'TEST',
    lang: 'en',
  },
  {
    value: 1,
    label: 'MALE',
    catalogCode: 'GENDER',
    lang: 'en',
  },
  {
    value: 2,
    label: 'FEMALE',
    catalogCode: 'GENDER',
    lang: 'en',
  },
  {
    value: 1,
    label: 'HOMBRE',
    catalogCode: 'GENDER',
    lang: 'es',
  },
  {
    value: 2,
    label: 'MUJER',
    catalogCode: 'GENDER',
    lang: 'es',
  },
];

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private translate = inject(TranslateService);
  constructor() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
    });
  }

  getData() {
    return Promise.resolve(CatalogsStore);
  }

  getDataByCodes(codes: string[], lang: string = 'en') {
    const result: { [key: string]: Array<any> } = {};

    for (let code of codes) {
      result[code] = CATALOGS.filter(
        (i) => i.catalogCode === code && i.lang === lang
      );
    }

    return Promise.resolve(result);
  }
}