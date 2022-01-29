import { IsString, IsInt, IsDate } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  discount: number;

  @IsString()
  image: string;

  @IsDate()
  date: Date;
}
