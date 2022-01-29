import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './schemas/developer.schema';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get('tags')
  getDeveloperTags(): Promise<string[]> {
    return this.developersService.getDeveloperTags();
  }

  @Get('search')
  getSearchDevelopers(
    @Query() { query }: { query: string },
  ): Promise<Developer[]> {
    return this.developersService.getSearchDevelopers(query);
  }

  @Get('search/options')
  getSearchOptions(@Query() { query }: { query: string }): Promise<string[]> {
    return this.developersService.getSearchOptions(query);
  }

  @Get('search/games/options')
  getGamesOptions(@Query() { query }: { query: string }): Promise<string[]> {
    return this.developersService.getGamesOptions(query);
  }

  @Get(':id')
  getDeveloper(@Param('id') id: string): Promise<Developer> {
    return this.developersService.getDeveloperById(id);
  }

  @Get()
  getDevelopers(
    @Query() queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Developer>> {
    return this.developersService.getDevelopers(queryParams);
  }

  @Post()
  createDeveloper(
    @Body() createDeveloperDto: CreateDeveloperDto,
  ): Promise<Developer> {
    return this.developersService.createDeveloper(createDeveloperDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadDeveloperImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return this.developersService.uploadDeveloperImage(file);
  }

  @Patch(':id')
  updateDeveloper(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ): Promise<Developer> {
    return this.developersService.updateDeveloper(id, updateDeveloperDto);
  }

  @Delete()
  deleteDevelopers(@Query() { ids }: { ids: string[] }): Promise<Developer[]> {
    return this.developersService.deleteDevelopersById(ids);
  }
}
