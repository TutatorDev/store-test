import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalApiService {
  constructor(private http: HttpClient) {}

  getCatalogs(data: any) {
    return firstValueFrom(this.http.post('zinc/getCatalogs', data));
  }

  getBy(data: any) {
    return firstValueFrom(this.http.post('generic/get-by', data));
  }

  countBy(data: any) {
    return firstValueFrom(this.http.post('generic/count-by', data));
  }
}
