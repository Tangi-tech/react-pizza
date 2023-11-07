export type Sort = {
  title: string;
  sort: 'rating' | 'entryPrice' | 'title';
}
export type Category = {
  title: string;
  index: number;
}

export type SetFiltersType = {
  sortObj: Sort | undefined;
  categoryObj: Category | undefined;
  page: number | undefined;
  order: string | undefined;
}

export interface FilterSliceState {
  pagination: {
    currentPage: number;
    limitOnPage: number;
  },
  currentCategory: Category,
  currentSort: Sort,
  sortOrder: boolean;
  searchValue: string;
}