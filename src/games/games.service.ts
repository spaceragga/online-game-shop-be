import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesRepository } from './games.repository';
import { getAllGamesResponse } from './schemas/game.types';

@Injectable()
export class GamesService {
  constructor(private readonly gamesRepository: GamesRepository) {}

  async getGameById(_id: string): Promise<Game> {
    return this.gamesRepository.findOne({ _id });
  }

  async getGames(req: Request): Promise<getAllGamesResponse> {
    return this.gamesRepository.find(req);
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
