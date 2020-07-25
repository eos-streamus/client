export class Constants {
  static SERVER_URL: string = "http://localhost:8080";

  static getUrl(endpoint: string) {
    return `${this.SERVER_URL}/${endpoint}`;
  }
}
