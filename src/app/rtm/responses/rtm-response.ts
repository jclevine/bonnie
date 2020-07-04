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

  getFrob() {
    return this.frob;
  }

}
