
export class RegisterResponse {
  private _success: boolean;
  private _errors: [{ fieldName: string, error: string }];

  get success(): boolean { return this._success; }
  get errors(): [{ fieldName: string, error: string }] { return this._errors; }

  constructor(success: boolean, errors: [{ fieldName: string, error: string }]) {
    this._success = success;
    this._errors = errors;
  }
}
