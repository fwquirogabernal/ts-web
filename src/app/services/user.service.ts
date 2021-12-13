import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICreateUserModel } from '../models/create-user-model';
import { IDeleteUserModel } from '../models/delete-user-model';
import { IUserModel } from '../models/user-model';
import { RequestOptions } from '../utils/request-options';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3003/api/';
  }

  public get(params?: any): Observable<any> {
    const url=!!params ? `users/${params}` : 'users'
    const options = new RequestOptions({ method: 'GET', url });
    return this.request(options);
  }

  public post(model:ICreateUserModel): Observable<any> {
    const options = new RequestOptions({ method: 'POST', url:'users', body: model });
    return this.request(options);
  }

  public put(model:IUserModel): Observable<any> {
    const options = new RequestOptions({ method: 'PUT', url:`users/${model.id}`, body: model });
    return this.request(options);
  }

  public delete(model:IDeleteUserModel): Observable<any> {
    const options = new RequestOptions({ method: 'DELETE', url:`users/${model.id}`});
    return this.request(options);
  }

  private request(options: RequestOptions) {    
    return this.http
      .request(options.method, this.baseUrl + options.url, options)
      .pipe(tap({ error: (error) => console.error(error) }));
  }
}
