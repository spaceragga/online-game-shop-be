import { IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  releasedGames: string[];

  @IsString()
  foundationDate: string;

  @IsString()
  image: string;
}
