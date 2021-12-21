import { Order } from './order.schema';

export interface getAllOrdersResponse {
  items: Order[];
  total: number;
}
