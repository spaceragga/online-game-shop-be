import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DiscountResponse, PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './schemas/achievement.schema';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get(':id')
  getAchievementById(@Param('id') id: string): Promise<Achievement> {
    return this.achievementsService.getAchievementById(id);
  }

  @Get()
  getAchievements(
    @Query() queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Achievement>> {
    return this.achievementsService.getAchievements(queryParams);
  }

  @Get('user/id')
  getUserDiscount(@Query() { id }: { id: string }): Promise<DiscountResponse> {
    return this.achievementsService.getUserDiscount(id);
  }

  @Post()
  createAchievement(
    @Body() createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsService.createAchievement(createAchievementDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsService.updateAchievement(id, updateAchievementDto);
  }

  @Delete()
  removeAchievements(
    @Query() { ids }: { ids: string[] },
  ): Promise<Achievement[]> {
    return this.achievementsService.deleteAchievementsById(ids);
  }
}
