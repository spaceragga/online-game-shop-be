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
import { PaginatedResponse } from '../types/main.types';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Get()
  getGames(@Req() req: Request): Promise<PaginatedResponse<Game>> {
    return this.gamesService.getGames(req);
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
