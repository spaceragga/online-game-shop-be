export type PaginatedResponse<T> = {
  items: T[];
  total: number;
};

export type DiscountResponse = {
  userAchievements: string[];
  discountNumber: number;
};

export type BookingResponse = {
  id: string;
  gameUpdates: { amount: number };
};

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}
