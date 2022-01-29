import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Developer, DeveloperSchema } from './schemas/developer.schema';
import { DevelopersRepository } from './developers.repository';
import { Game, GameSchema } from '../games/schemas/game.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    CloudinaryModule,
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService, DevelopersRepository],
})
export class DevelopersModule {}
