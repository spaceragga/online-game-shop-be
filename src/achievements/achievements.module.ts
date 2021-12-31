import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Achievement, AchievementSchema } from './schemas/achievement.schema';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { AchievementsRepository } from './achievements.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema },
    ]),
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService, AchievementsRepository],
})
export class AchievementsModule {}
