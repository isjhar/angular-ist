import { format } from 'date-fns';

export function toApiPageIndex(page?: number): number | undefined {
  if (page) {
    return page + 1;
  }
  return 1;
}

export function toDateOnly(date: Date | null): string | null {
  if (!date) return null;
  return format(date, 'yyyy-MM-dd');
}
