import { Task } from './Task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FrobResponse } from './RtmResponse';

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

  private static signRequest() {
    return '2ab2e6ce5f3e008e04bfbd76195c2b4d';
  }

  private buildUrl(method: string): string {
    return `/services/rest/?method=${method}&api_key=${this.rtmApiId.apiKey}&format=json&api_sig=${RtmCommander.signRequest()}`;
  }

  doAuth(): Observable<FrobResponse> {
    return this.http.get<FrobResponse>(this.buildUrl('rtm.auth.getFrob'));
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
