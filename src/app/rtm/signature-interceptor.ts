import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable()
export class SignatureInterceptor implements HttpInterceptor {

  static sign(secretKey: string, params: HttpParams): string {
    return String(new Md5().appendStr(`${secretKey}${this.buildSortedParamString(params)}`).end());
  }

  private static buildSortedParamString(params: HttpParams) {
    const keys: string[] = params.keys().sort();
    let paramString = '';
    if (keys.length > 0) {
      paramString = `${keys[0]}${params.get(keys[0])}`;
    }
    return keys.slice(1).reduce(
        (previousValue, currentValue) => previousValue.concat(currentValue, params.get(currentValue)),
        paramString);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const signedReq = req.clone({
      setParams: {
        api_sig: SignatureInterceptor.sign(req.headers.get('secretKey'), req.params)
      }
    });
    return next.handle(signedReq);
  }
}
