import * as jwt_decode from 'jwt-decode';

export class Tokens {
  private _encodedRefreshToken: string;
  private _encodedSessionToken: string;

  public constructor(encodedRefreshToken: string, encodedSessionToken: string) {
    // Must be valid tokens. Throws an exception if it is not the case.
    jwt_decode(encodedRefreshToken);
    jwt_decode(encodedSessionToken);
    this._encodedRefreshToken = encodedRefreshToken;
    this._encodedSessionToken = encodedSessionToken;
  }

  public get encodedRefreshToken(): string {
    return this._encodedRefreshToken;
  }

  public get encodedSessionToken(): string {
    return this._encodedSessionToken;
  }

  public get refreshToken(): Token {
    const decoded = jwt_decode(this.encodedRefreshToken);
    return {
      expiresAt: decoded.exp * 1000,
      issuedAt: decoded.iat * 1000,
      id: decoded.jti,
      userId: decoded.userId,
      isAdmin: decoded.isAdmin
    };
  }

  public get sessionToken(): Token {
    const decoded = jwt_decode(this.encodedSessionToken);
    return {
      email: decoded.email,
      expiresAt: decoded.exp * 1000,
      issuedAt: decoded.iat * 1000,
      id: decoded.jti,
      userId: decoded.userId,
      isAdmin: decoded.isAdmin
    };
  }

  public serialized(): { refreshToken: string, sessionToken: string } {
    return {
      refreshToken: this.encodedRefreshToken,
      sessionToken: this.encodedSessionToken
    }
  }
}

export interface Token {
  email?: string, expiresAt: number, issuedAt: number, id: string, userId: number, isAdmin?: boolean
}
