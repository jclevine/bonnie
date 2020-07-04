import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable()
export class SignatureInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const signedReq = req.clone({
      setParams: {
        api_sig: this.sign(req.headers.get('secretKey'), req.params)
      }
    });
    return next.handle(signedReq);
  }

  sign(secretKey: string, params: HttpParams) {
    return new Md5().appendStr(`${secretKey}${this.buildSortedParamString(params)}`).end();
  }

  private buildSortedParamString(params: HttpParams) {
    const keys: string[] = params.keys().sort();
    let paramString = '';
    if (keys.length > 0) {
      paramString = `${keys[0]}${params.get(keys[0])}`;
    }
    return keys.slice(1).reduce(
        (previousValue, currentValue) => previousValue.concat(currentValue, params.get(currentValue)),
        paramString);
  }

  private buildConcatKeyValue(key: string, params: HttpParams) {
    return `${key}${params[key]}`;
  }
}
