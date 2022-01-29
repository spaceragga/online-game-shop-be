import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { DevelopersRepository } from './developers.repository';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './schemas/developer.schema';

@Injectable()
export class DevelopersService {
  constructor(
    private readonly developersRepository: DevelopersRepository,
    private cloudinary: CloudinaryService,
  ) {}

  getDeveloperTags(): Promise<string[]> {
    return this.developersRepository.findTags();
  }

  getSearchDevelopers(queryParams: string): Promise<Developer[]> {
    return this.developersRepository.findDevelopersByQuery(queryParams);
  }

  getSearchOptions(queryParams: string): Promise<string[]> {
    return this.developersRepository.findOptionsByQuery(queryParams);
  }

  getGamesOptions(queryParams: string): Promise<string[]> {
    return this.developersRepository.findGamesOptionsByQuery(queryParams);
  }

  getDeveloperById(id: string): Promise<Developer> {
    return this.developersRepository.findOne(id);
  }

  getDevelopers(
    queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Developer>> {
    return this.developersRepository.find(queryParams);
  }

  createDeveloper(createDeveloperDto: CreateDeveloperDto): Promise<Developer> {
    return this.developersRepository.create(createDeveloperDto);
  }

  uploadDeveloperImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  updateDeveloper(
    id: string,
    gameUpdates: UpdateDeveloperDto,
  ): Promise<Developer> {
    return this.developersRepository.findOneAndUpdate(id, gameUpdates);
  }

  deleteDevelopersById(ids: string[]): Promise<Developer[]> {
    return Promise.all(
      ids.map((id) => {
        return this.developersRepository.delete(id);
      }),
    );
  }
}
