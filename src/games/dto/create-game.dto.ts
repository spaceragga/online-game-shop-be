import { IsInt, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  released: string;

  @IsString()
  gameDev: string;

  @IsString()
  description: string;

  @IsString()
  genre: string;

  @IsInt()
  rating: number;

  @IsString()
  ageRating: string;

  @IsInt()
  price: number;

  @IsInt()
  amount: number;

  @IsString()
  image: string;
}
