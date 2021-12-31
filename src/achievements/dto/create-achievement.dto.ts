import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  discount: number;

  @IsDate()
  date: Date;
}
