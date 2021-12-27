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
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';
import { PaginatedResponse } from '../types/main.types';
import { GetGamesQuery } from './dto/game-query.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Get()
  getGames(
    @Query() queryParams: GetGamesQuery,
  ): Promise<PaginatedResponse<Game>> {
    return this.gamesService.getGames(queryParams);
  }

  @Post()
  createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto);
  }

  @Patch(':id')
  updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<Game> {
    return this.gamesService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  deleteGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.deleteGameById(id);
  }
}
