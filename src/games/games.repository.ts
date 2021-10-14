import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Game, GameDocument } from './schemas/game.schema';
@Injectable()
export class GamesRepository {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async findOne(gameFilterQuery: FilterQuery<GameDocument>): Promise<Game> {
    return this.gameModel.findOne(gameFilterQuery);
  }

  async find(gamesFilterQuery: FilterQuery<GameDocument>): Promise<Game[]> {
    return this.gameModel.find(gamesFilterQuery);
  }

  async create(game: Partial<Game>): Promise<Game> {
    return this.gameModel.create(game);
  }

  async findOneAndUpdate(
    gameFilterQuery: FilterQuery<GameDocument>,
    game: Partial<Game>,
  ): Promise<Game> {
    return this.gameModel.findOneAndUpdate(gameFilterQuery, game, {
      new: true,
    });
  }

  async delete(id: Partial<Game>): Promise<Game> {
    return this.gameModel.findOneAndDelete(id);
  }
}
