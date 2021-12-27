import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesRepository } from './games.repository';
import { PaginatedResponse } from '../types/main.types';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  getGameById(_id: string): Promise<Game> {
    return this.gamesRepository.findOne({ _id });
  }

  getGames(req: Request): Promise<PaginatedResponse<Game>> {
    return this.gamesRepository.find(req);
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
