export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
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
    if (value !== null && value !== undefined) {
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
