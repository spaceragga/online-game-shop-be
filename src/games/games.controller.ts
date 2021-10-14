import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

import { Game } from './schemas/game.schema';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  async getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Get()
  async getGames(): Promise<Game[]> {
    return this.gamesService.getGames();
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
