export class ApiUrlBuilder {
  urls: string[] = [];
  constructor(baseUrl: string) {
    this.urls.push(baseUrl);
  }

  pushQueryParam(key: string, value?: any) {
    if (value === null || value === undefined || value === '') {
      return;
    }

    if (value.constructor === Array) {
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        if (!this.urls.find((x) => x == '?')) {
          this.urls.push('?');
        } else {
          this.urls.push('&');
        }
        this.urls.push(`${key}[]=${element}`);
      }
      return;
    }

    if (!this.urls.find((x) => x == '?')) {
      this.urls.push('?');
    } else {
      this.urls.push('&');
    }
    this.urls.push(`${key}=${value}`);
  }

  getUrl(): string {
    return this.urls.join('');
  }
}
