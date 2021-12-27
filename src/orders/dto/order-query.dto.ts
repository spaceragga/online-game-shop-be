import { IsDate, IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { Sort } from '../../types/main.types';

export class GetOrdersQuery {
  @IsInt()
  @Min(0)
  @Max(100)
  page: number;

  @IsInt()
  @Min(0)
  @Max(100)
  limit: number;

  @IsEnum(Sort)
  sortBy: Sort;

  @IsDate()
  sortRow: Date;
}

export class GetOrdersByIdQuery {
  @IsString()
  id: string;

  @IsEnum(Sort)
  sortBy: Sort;
}
