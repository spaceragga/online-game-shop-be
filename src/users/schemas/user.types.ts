import { User } from './user.schema';

export interface getAllUsersResponse {
  items: User[];
  total: number;
}
