import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommonService } from '../common/common.service';
import { PaginatedResponse } from '../types/main.types';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesRepository extends CommonService<Game> {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    super(gameModel);
  }

  async findOne(gameFilterQuery: FilterQuery<GameDocument>): Promise<Game> {
    return this.gameModel.findOne(gameFilterQuery);
  }

  async find(
    gamesFilterQuery: FilterQuery<GameDocument>,
  ): Promise<PaginatedResponse<Game>> {
    return this.getEntityWithPagination(gamesFilterQuery.query);
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
