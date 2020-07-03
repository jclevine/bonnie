export class RtmRequest {

  private sharedSecret;

  private constructor(sharedSecret: string) {
    this.sharedSecret = sharedSecret;
  }

  static withSharedSecret(sharedSecret: string): RtmRequest {
    return new RtmRequest(sharedSecret);
  }

  private buildSigningRequest(params: Map<string, string>) {
    [params.entries()].sort();


  }


}
