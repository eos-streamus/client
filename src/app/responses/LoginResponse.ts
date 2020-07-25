
export class LoginResponse {
  private _success: boolean;
  private _message: string;

  get message(): string {
    return this._message;
  }

  get success(): boolean {
    return this._success;
  }

  constructor(success: boolean, message: string) {
    this._success = success;
    this._message = message;
  }
}