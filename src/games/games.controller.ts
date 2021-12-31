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
import { GetQueryDTO } from '../types/validators';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('tags')
  getGameTags(): Promise<string[]> {
    return this.gamesService.getGameTags();
  }

  @Get('search')
  getSearchGames(@Query() { query }: { query: string }): Promise<Game[]> {
    console.log(query);
    return this.gamesService.getSearchGames(query);
  }

  @Get('search/options')
  getSearchOptions(@Query() { query }: { query: string }): Promise<string[]> {
    console.log(query);
    return this.gamesService.getSearchOptions(query);
  }

  @Get(':id')
  getGame(@Param('id') id: string): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Get()
  getGames(
    @Query() queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Game>> {
    console.log(queryParams);
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
