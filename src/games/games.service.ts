import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesRepository } from './games.repository';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async getGameById(_id: string): Promise<Game> {
    return this.gamesRepository.findOne({ _id });
  }

  async getGames(): Promise<Game[]> {
    return this.gamesRepository.find({});
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesRepository.create(createGameDto);
  }

  async updateGame(_id: string, gameUpdates: UpdateGameDto): Promise<Game> {
    return this.gamesRepository.findOneAndUpdate({ _id }, gameUpdates);
  }

  async deleteGameById(_id: string): Promise<Game> {
    return this.gamesRepository.delete({ _id });
  }
}
