import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { PaginatedResponse } from '../types/main.types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUserById(_id: string): Promise<User> {
    return this.usersRepository.findOne({ _id });
  }

  getUsers(req: Request): Promise<PaginatedResponse<User>> {
    return this.usersRepository.find(req);
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

  updateUser(_id: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id }, userUpdates);
  }

  deleteUserById(_id: string): Promise<User> {
    return this.usersRepository.delete({ _id });
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
