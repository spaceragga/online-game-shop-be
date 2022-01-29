import { IsEnum, IsString } from 'class-validator';
import { Sort } from '../../types/main.types';

export class GetOrdersByIdQuery {
  @IsString()
  id: string;

  @IsEnum(Sort)
  sortBy: Sort;
}
