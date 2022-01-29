import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommonService } from '../common/common.service';
import { Game, GameDocument } from '../games/schemas/game.schema';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { Developer, DeveloperDocument } from './schemas/developer.schema';

@Injectable()
export class DevelopersRepository extends CommonService<Developer> {
  constructor(
    @InjectModel(Developer.name)
    private developerModel: Model<DeveloperDocument>,
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
  ) {
    super(developerModel);
  }

  async findTags(): Promise<string[]> {
    return this.developerModel.distinct('name');
  }

  async findDevelopersByQuery(
    developerFilterQuery: string,
  ): Promise<Developer[]> {
    return this.developerModel.find({
      $or: [{ name: new RegExp(developerFilterQuery, 'i') }],
    });
  }

  async findOptionsByQuery(developerFilterQuery: string): Promise<string[]> {
    const names = this.developerModel
      .find({
        $or: [{ name: new RegExp(developerFilterQuery, 'i') }],
      })
      .distinct('name');

    return names;
  }

  async findGamesOptionsByQuery(
    developerFilterQuery: string,
  ): Promise<string[]> {
    const names = this.gameModel
      .find({
        $or: [{ name: new RegExp(developerFilterQuery, 'i') }],
      })
      .distinct('name');

    return names;
  }

  async findOne(id: string): Promise<Developer> {
    return this.developerModel.findOne({ _id: id });
  }

  find(
    gamesFilterQuery: FilterQuery<GetQueryDTO>,
  ): Promise<PaginatedResponse<Developer>> {
    return this.getEntityWithPagination(gamesFilterQuery);
  }

  create(game: Partial<Developer>): Promise<Developer> {
    return this.developerModel.create(game);
  }

  async findOneAndUpdate(
    id: string,
    gameUpdates: Partial<Developer>,
  ): Promise<Developer> {
    return this.developerModel.findOneAndUpdate({ _id: id }, gameUpdates, {
      new: true,
    });
  }

  async delete(id: string): Promise<Developer> {
    return this.developerModel.findOneAndDelete({ _id: id });
  }
}
