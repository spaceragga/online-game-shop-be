import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommonService } from '../common/common.service';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesRepository extends CommonService<Game> {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {
    super(gameModel);
  }

  async findTags(): Promise<string[]> {
    return this.gameModel.distinct('genre');
  }

  async findGamesByQuery(gameFilterQuery: string): Promise<Game[]> {
    return this.gameModel.find({
      $or: [
        { name: new RegExp(gameFilterQuery, 'i') },
        { gameDev: new RegExp(gameFilterQuery, 'i') },
      ],
    });
  }

  async findOptionsByQuery(gameFilterQuery: string): Promise<string[]> {
    const [names, gameDev] = await Promise.all([
      this.gameModel
        .find({
          $or: [{ name: new RegExp(gameFilterQuery, 'i') }],
        })
        .distinct('name'),
      this.gameModel
        .find({
          $or: [{ gameDev: new RegExp(gameFilterQuery, 'i') }],
        })
        .distinct('gameDev'),
      ,
    ]);

    return names.concat(gameDev);
  }

  async findOne(id: string): Promise<Game> {
    return this.gameModel.findOne({ _id: id });
  }

  find(
    gamesFilterQuery: FilterQuery<GetQueryDTO>,
  ): Promise<PaginatedResponse<Game>> {
    return this.getEntityWithPagination(gamesFilterQuery);
  }

  create(game: Partial<Game>): Promise<Game> {
    return this.gameModel.create(game);
  }

  async findOneAndUpdate(
    id: string,
    gameUpdates: Partial<Game>,
  ): Promise<Game> {
    return this.gameModel.findOneAndUpdate({ _id: id }, gameUpdates, {
      new: true,
    });
  }

  async delete(id: string): Promise<Game> {
    return this.gameModel.findOneAndDelete({ _id: id });
  }
}
