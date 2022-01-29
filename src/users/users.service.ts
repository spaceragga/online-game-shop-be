import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private cloudinary: CloudinaryService,
  ) {}

  getUserById(_id: string): Promise<User> {
    return this.usersRepository.findOne({ _id });
  }

  getUsers(queryParams: GetQueryDTO): Promise<PaginatedResponse<User>> {
    return this.usersRepository.find(queryParams);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { email, password, role } = user;
    const existUser = await this.usersRepository.findOne({ email });
    if (existUser) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.create({
      email,
      password,
      role,
    });
  }

  async uploadProfilePhoto(file: Express.Multer.File, _id: string) {
    const cloudRes = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    return this.usersRepository.findOneAndUpdate(
      { _id },
      { profilePhoto: cloudRes.url },
    );
  }

  updateUser(_id: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id }, userUpdates);
  }

  deleteUsersById(ids: string[]): Promise<User[]> {
    return Promise.all(
      ids.map((id) => {
        return this.usersRepository.delete(id);
      }),
    );
  }

  async findByLogin(checkUser: User): Promise<User> {
    const { email, password } = checkUser;
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: User): Promise<User> {
    const { email } = payload;
    return await this.usersRepository.findOne({ email });
  }

  sanitizeUser(user: UserDocument): User {
    const sanitized = user.toObject();
    delete sanitized.password;
    return sanitized;
  }
}
