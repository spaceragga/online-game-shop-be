import { Game } from './game.schema';

export interface getAllGamesResponse {
  items: Game[];
  total: number;
}
