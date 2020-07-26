export interface RegisterResponseSuccessData {
  id: number,
  firstName: string,
  lastName: string,
  dateOfBirth: number,
  createdAt: string,
  updatedAt: string,
  email: string,
  username: string
}


export class RegisterResponse {
  private _success: boolean;
  private _errors: [{ fieldName: string, error: string }];
  private _data?: RegisterResponseSuccessData


  get success(): boolean { return this._success; }
  get errors(): [{ fieldName: string, error: string }] { return this._errors; }
  get data(): RegisterResponseSuccessData { return this._data; }

  constructor(success: boolean, errors: [{ fieldName: string, error: string }], data?: RegisterResponseSuccessData) {
    this._success = success;
    this._errors = errors;
    this._data = data;
  }
}
