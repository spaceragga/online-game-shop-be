export type PaginatedResponse<T> = {
  items: T[];
  total: number;
};

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}
