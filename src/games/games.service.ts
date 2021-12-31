import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesRepository } from './games.repository';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  getGameTags(): Promise<string[]> {
    return this.gamesRepository.findTags();
  }

  getSearchGames(queryParams: string): Promise<Game[]> {
    return this.gamesRepository.findGamesByQuery(queryParams);
  }

  getSearchOptions(queryParams: string): Promise<string[]> {
    return this.gamesRepository.findOptionsByQuery(queryParams);
  }

  getGameById(_id: string): Promise<Game> {
    return this.gamesRepository.findOne({ _id });
  }

  getGames(queryParams: GetQueryDTO): Promise<PaginatedResponse<Game>> {
    return this.gamesRepository.find(queryParams);
  }

  createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesRepository.create(createGameDto);
  }

  updateGame(_id: string, gameUpdates: UpdateGameDto): Promise<Game> {
    return this.gamesRepository.findOneAndUpdate({ _id }, gameUpdates);
  }

  deleteGameById(_id: string): Promise<Game> {
    return this.gamesRepository.delete({ _id });
  }
}
