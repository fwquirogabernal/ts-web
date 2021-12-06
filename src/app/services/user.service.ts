import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RequestOptions } from '../utils/request-options';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3003/api/';
  }

  public get(url: string, params?: any): Observable<any> {
    const options = new RequestOptions({ method: 'GET', url, params });
    return this.request(options);
  }

  private request(options: RequestOptions) {
    options.params = options.params || new HttpParams();
    return this.http
      .request(options.method, this.baseUrl + options.url, options)
      .pipe(tap({ error: (error) => console.error(error) }));
  }
}
