import Dexie, { Table } from 'dexie';
import { environment } from '../../../environments/environment';
export interface catalogs_I {
  id: string;
  updatedAt: number;
  softDelete: boolean;
  value: string;
  label: string;
  lang: string;
  catalogCode: string;
  catalogCodeDep: string;
  status: number;
}

export interface offlineUser_I {
  id?: string;
  email?: string;
  username?: string;
  firstName: string;
  lastName?: string;
  password: string;
  gender?: string;
  roles?: string;
  offices?: string;
  sql_deleted: boolean;
}

export class LocaldbService extends Dexie {
  catalogs!: Table<catalogs_I, string>;
  offlineUser!: Table<offlineUser_I, string>;
  constructor() {
    Dexie.debug = true;
    super(environment.appCode);
    this.version(1).stores({
      catalogs: '&id, catalogCode',
      offlineUser: '&id, username',
    });
  }
}

export const db = new LocaldbService();
