import { db } from './localdb.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalapiService {

  async getCatalogs(catalogs: any) {
    try {
      let resp: Record<string, any> = {};
      catalogs.catalogs.forEach((c: any) => {
        resp[c] = [];
      });
      const r = await db.catalogs.where('catalogCode').anyOf(catalogs.catalogs).and((x) => {
        return x.lang === catalogs.lang;
      }).toArray();
      r.forEach((m) => {
        resp[m.catalogCode].push({label: m.label, value: m.value, parent: m.catalogCodeDep});
      });
      return resp;
    } catch (error) {
      console.log(error);
      return {};
    }
  }
}
