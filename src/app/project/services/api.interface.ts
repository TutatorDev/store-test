export interface CatalogsI {
  lang: string;
  catalogs: string[];
}

export interface ApiServiceI {
  getCatalogs(data: CatalogsI): Promise<any>;
}
