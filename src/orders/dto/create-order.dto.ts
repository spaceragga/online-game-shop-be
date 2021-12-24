import { Game } from '../../games/schemas/game.schema';

export class CreateOrderDto {
  _id: string;
  userId: string;
  email: string;
  items: Game[];
  date: Date;
}
