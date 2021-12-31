import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { AchievementsRepository } from './achievements.repository';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './schemas/achievement.schema';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
  ) {}

  getAchievementById(_id: string): Promise<Achievement> {
    return this.achievementsRepository.findOne({ _id });
  }

  getAchievements(
    queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Achievement>> {
    return this.achievementsRepository.find(queryParams);
  }

  createAchievement(
    createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsRepository.create(createAchievementDto);
  }

  updateAchievement(
    _id: string,
    updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsRepository.findOneAndUpdate(
      { _id },
      updateAchievementDto,
    );
  }

  deleteAchievementById(_id: string): Promise<Achievement> {
    return this.achievementsRepository.delete({ _id });
  }
}
