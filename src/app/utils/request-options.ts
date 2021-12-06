import { HttpParams } from '@angular/common/http';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class RequestOptions {
  method: RequestMethod;
  url: string;
  body?: any;
  params?: HttpParams;

  constructor(options: RequestOptions) {
    this.method = options.method;
    this.url = options.url;
    this.body = options.body;
    this.params = options.params;
  }
}
