export class ApiUrlBuilder {
  urls: string[] = [];
  constructor(baseUrl: string) {
    this.urls.push(baseUrl);
  }

  pushQueryParam(key: string, value?: any) {
    if (value !== null && value !== undefined && value !== '') {
      if (!this.urls.find((x) => x == '?')) {
        this.urls.push('?');
      } else {
        this.urls.push('&');
      }
      this.urls.push(`${key}=${value}`);
    }
  }

  getUrl(): string {
    return this.urls.join('');
  }
}
