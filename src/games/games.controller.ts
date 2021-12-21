import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { getAllGamesResponse } from './schemas/game.types';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  async getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Get()
  async getGames(@Req() req: Request): Promise<getAllGamesResponse> {
    return this.gamesService.getGames(req);
  }

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto);
  }

  @Patch(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gamesService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.deleteGameById(id);
  }
}
