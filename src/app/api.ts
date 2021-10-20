export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface Pagination<T> {
  total: number;
  data: T[];
}

export class ApiUrlBuilder {
  urls: string[] = [];
  constructor(baseUrl: string) {
    this.urls.push(baseUrl);
  }

  pushQueryParam(key: string, value?: any) {
    if (value) {
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
