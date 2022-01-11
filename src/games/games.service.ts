import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './schemas/game.schema';
import { GamesRepository } from './games.repository';
import { BookingResponse, PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private cloudinary: CloudinaryService,
  ) {}

  getGameTags(): Promise<string[]> {
    return this.gamesRepository.findTags();
  }

  getSearchGames(queryParams: string): Promise<Game[]> {
    return this.gamesRepository.findGamesByQuery(queryParams);
  }

  getSearchOptions(queryParams: string): Promise<string[]> {
    return this.gamesRepository.findOptionsByQuery(queryParams);
  }

  getGameById(id: string): Promise<Game> {
    return this.gamesRepository.findOne(id);
  }

  getGames(queryParams: GetQueryDTO): Promise<PaginatedResponse<Game>> {
    return this.gamesRepository.find(queryParams);
  }

  createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesRepository.create(createGameDto);
  }

  uploadGameImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  updateGame(id: string, gameUpdates: UpdateGameDto): Promise<Game> {
    return this.gamesRepository.findOneAndUpdate(id, gameUpdates);
  }

  deleteGamesById(ids: string[]): Promise<Game[]> {
    return Promise.all(
      ids.map((id) => {
        return this.gamesRepository.delete(id);
      }),
    );
  }

  async checkBookingOrders(
    data: Game[],
    action: string,
  ): Promise<BookingResponse[]> {
    return await Promise.all(
      data.map(async (el) => {
        const game = await this.gamesRepository.findOne(el._id);
        const gameAmount =
          action === 'addBooking'
            ? game.amount - el.quantity.physical
            : action === 'abortBooking'
            ? game.amount + el.quantity.physical
            : null;
        return { id: el._id, gameUpdates: { amount: gameAmount } };
      }),
    );
  }
}
