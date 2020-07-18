import { RtmPermissions } from '../rtm-commander';

export interface RawFrobResponse {
  rsp: {
    stat: string;
    frob: string;
  };
}

export class FrobResponse {
  frob: string;

  constructor(rawFrobResponse: RawFrobResponse) {
    this.frob = rawFrobResponse.rsp.frob;
  }
}

export interface RawTokenResponse {
  rsp: {
    auth: {
      token: string,
      perms: RtmPermissions,
      user: User
    }
  };
}

export class TokenResponse {
  token: string;
  constructor(rawTokenResponse: RawTokenResponse) {
    this.token = rawTokenResponse.rsp.auth.token;
  }
}

export interface User {
  id: string;
  username: string;
  fullname: string;
}
