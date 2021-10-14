import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { GamesService } from './games.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository],
})
export class GamesModule {}
