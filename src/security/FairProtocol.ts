import { SecureRandomProvider } from "./SecureRandomProvider.js";

export class FairProtocol {
  private readonly key: string;
  private readonly value: number;
  private readonly hmac: string;
  private readonly randomProvider: SecureRandomProvider;

  constructor(private readonly range: number) {
    this.randomProvider = new SecureRandomProvider();
    this.key = this.randomProvider.generateKey();
    this.value = this.randomProvider.generateRandomNumber(this.range);
    this.hmac = this.randomProvider.computeHmac(this.key, this.value);
  }

  getHmac(): string {
    return this.hmac;
  }

  reveal(): { value: number; key: string } {
    return {
      value: this.value,
      key: this.key,
    };
  }
}
