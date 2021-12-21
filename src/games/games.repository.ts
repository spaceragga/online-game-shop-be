import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Game, GameDocument } from './schemas/game.schema';
import { getAllGamesResponse } from './schemas/game.types';
@Injectable()
export class GamesRepository {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async findOne(gameFilterQuery: FilterQuery<GameDocument>): Promise<Game> {
    return this.gameModel.findOne(gameFilterQuery);
  }

  async find(
    gamesFilterQuery: FilterQuery<GameDocument>,
  ): Promise<getAllGamesResponse> {
    const { page, limit, sortBy, sortRow } = gamesFilterQuery.query;
    const total = await this.gameModel.count();

    const items = await this.gameModel
      .find()
      .sort([[sortRow, sortBy]])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit))
      .exec();
    return {
      items,
      total,
    };
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
