import { Task } from './task';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FrobResponse, RawFrobResponse } from './responses/rtm-response';
import { concatMap } from 'rxjs/operators';
import { SignatureInterceptor } from './signature-interceptor';

export enum RtmPermissions {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete'
}

export interface RtmApiId {
  apiKey: string;
  secretKey: string;
  rtmPermissions: RtmPermissions;
}

export class RtmCommander {

  constructor(rtmApiId: RtmApiId, http: HttpClient) {
    this.rtmApiId = rtmApiId;
    this.http = http;
  }
  private rtmApiId: RtmApiId;
  private http: HttpClient;

  private buildRequest(method: string, format = 'json') {
    return {
      params: {
        method,
        api_key: this.rtmApiId.apiKey,
        format
      },
      headers: {
        secretKey: this.rtmApiId.secretKey
      }
    };
  }

  doAuth(): Observable<string> {
    return this.http.get<RawFrobResponse>(
      '/services/rest/',
      this.buildRequest('rtm.auth.getFrob')
    ).pipe(
      concatMap(response => of(this.printOutAcceptUrl(response)))
    );
  }

  printOutAcceptUrl(rawFrobResponse: RawFrobResponse): string {
    const url = this.buildAcceptUrl(new FrobResponse(rawFrobResponse).getFrob());
    console.log(url);
    return url;
  }

  buildAcceptUrl(frob: string) {

    const signature = SignatureInterceptor.sign(this.rtmApiId.secretKey, new HttpParams({
      fromObject: {
        api_key: this.rtmApiId.apiKey,
        perms: this.rtmApiId.rtmPermissions,
        frob
      }
    }));
    const url = new URL('https://www.rememberthemilk.com/services/auth/');
    url.searchParams.append('api_key', this.rtmApiId.apiKey);
    url.searchParams.append('perms', this.rtmApiId.rtmPermissions);
    url.searchParams.append('frob', frob);
    url.searchParams.append('api_sig', signature);
    console.log(url.toString());
    return url.toString();
  }

  getTasks(): Task[] {
    return [
      {
        name: 'Complice monthly review'
      },
      {
        name: 'Call Mom'
      },
      {
        name: 'Call Dad'
      },
      {
        name: 'Finish BLE Grit Everett 3 Activities'
      },
      {
        name: 'Definitely go over month\'s mint transactions'
      },
      {
        name: 'Get recipe from Andrea for falafel salad'
      }
    ];
  }
}
