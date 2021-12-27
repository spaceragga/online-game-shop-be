import { IsDate, IsEnum, IsInt, Max, Min } from 'class-validator';
import { Sort } from '../../types/main.types';

export class GetUsersQuery {
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
