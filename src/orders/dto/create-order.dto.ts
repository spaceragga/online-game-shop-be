import { Game } from 'src/games/schemas/game.schema';

export class CreateOrderDto {
  _id: string;
  userId: string;
  email: string;
  items: Game[];
  date: Date;
}
