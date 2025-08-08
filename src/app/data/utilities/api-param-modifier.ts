export function toApiPageIndex(page?: number): number | undefined {
  if (page) {
    return page + 1;
  }
  return 1;
}
