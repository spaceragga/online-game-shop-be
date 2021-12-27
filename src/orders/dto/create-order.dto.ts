import {
  Equals,
  IsArray,
  IsDate,
  IsEmail,
  IsMongoId,
  IsString,
} from 'class-validator';
import { Game } from '../../games/schemas/game.schema';

export class CreateOrderDto {
  @IsMongoId()
  _id: string;

  @IsString()
  userId: string;

  @IsEmail()
  email: string;

  @IsArray()
  @Equals(Game)
  items: Game[];

  @IsDate()
  date: Date;
}
