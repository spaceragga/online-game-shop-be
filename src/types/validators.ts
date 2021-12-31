import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Sort } from './main.types';

export class GetQueryDTO {
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

  @IsString()
  sortRow: string;

  @IsOptional()
  @IsString()
  category: string;
}
