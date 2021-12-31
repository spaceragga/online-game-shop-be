import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommonService } from '../common/common.service';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { Achievement, AchievementDocument } from './schemas/achievement.schema';

@Injectable()
export class AchievementsRepository extends CommonService<Achievement> {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
  ) {
    super(achievementModel);
  }

  async findOne(
    achievementFilterQuery: FilterQuery<AchievementDocument>,
  ): Promise<Achievement> {
    return this.achievementModel.findOne(achievementFilterQuery);
  }

  async find(
    achievementFilterQuery: FilterQuery<GetQueryDTO>,
  ): Promise<PaginatedResponse<Achievement>> {
    return this.getEntityWithPagination(achievementFilterQuery);
  }

  create(achievement: Partial<Achievement>): Promise<Achievement> {
    return this.achievementModel.create(achievement);
  }

  async findOneAndUpdate(
    achievementFilterQuery: FilterQuery<AchievementDocument>,
    achievement: Partial<Achievement>,
  ): Promise<Achievement> {
    return this.achievementModel.findOneAndUpdate(
      achievementFilterQuery,
      achievement,
      {
        new: true,
      },
    );
  }

  async delete(id: Partial<Achievement>): Promise<Achievement> {
    return this.achievementModel.findOneAndDelete(id);
  }
}
