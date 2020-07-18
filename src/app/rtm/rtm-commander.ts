import { Task } from './task';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FrobResponse, RawFrobResponse, RawTokenResponse, TokenResponse } from './responses/rtm-response';
import { concatMap } from 'rxjs/operators';
import { SignatureInterceptor } from './signature-interceptor';
import { Token } from '@angular/compiler';

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
        format,
        frob: undefined
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
      // TODO: jlevine - Already accepted auth, need to put this into a more simple workflow, but no longer need it
      concatMap(rawFrobResponse => of(this.printOutAcceptUrl(rawFrobResponse))),
      concatMap(frob => this.getToken(frob)),
      concatMap(rawTokenResponse => {
        const token: string = new TokenResponse(rawTokenResponse).token;
        console.log(token);
        return token;
      })
    );
  }

  printOutAcceptUrl(rawFrobResponse: RawFrobResponse): string {
    const frob = new FrobResponse(rawFrobResponse).frob;
    const url = this.buildAcceptUrl(frob);
    console.log(url);
    return frob;
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

  private getToken(frob: string): Observable<RawTokenResponse> {
    const request = this.buildRequest('rtm.auth.getToken');
    request.params.frob = frob;
    request.params.perms = this.rtmApiId.rtmPermissions;
    return this.http.get<RawTokenResponse>(
      '/services/rest/',
      request
    );
  }
}
