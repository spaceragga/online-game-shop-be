import { Injectable } from '@nestjs/common';
import { DiscountResponse, PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { UsersRepository } from '../users/users.repository';
import { AchievementsRepository } from './achievements.repository';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './schemas/achievement.schema';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly achievementsRepository: AchievementsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  getAchievementById(_id: string): Promise<Achievement> {
    return this.achievementsRepository.findOne({ _id });
  }

  getAchievements(
    queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Achievement>> {
    return this.achievementsRepository.find(queryParams);
  }

  async getUserDiscount(_id: string): Promise<DiscountResponse> {
    const [achievements, user] = await Promise.all([
      this.achievementsRepository.findAll(),
      this.usersRepository.findOne({ _id }),
    ]);

    const amountDiscount = this.checkDiscount(
      achievements,
      user.gotAchievements,
    );
    return {
      userAchievements: user.gotAchievements,
      discountNumber: amountDiscount,
    };
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

  deleteAchievementsById(ids: string[]): Promise<Achievement[]> {
    return Promise.all(
      ids.map((id) => {
        return this.achievementsRepository.delete(id);
      }),
    );
  }

  checkDiscount = <T extends { name: U; discount: number }, U>(
    items: T[],
    names: U[],
  ): number => {
    return items.reduce((acc: number, item: T) => {
      return names.some((name) => item.name === name)
        ? acc + item.discount
        : acc;
    }, 0);
  };
}
