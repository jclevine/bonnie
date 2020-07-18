import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FrobResponse, RawFrobResponse } from './responses/rtm-response';

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

  doAuth(): Observable<RawFrobResponse> {
    return this.http.get<RawFrobResponse>(
      '/services/rest/',
      this.buildRequest('rtm.auth.getFrob'));
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
