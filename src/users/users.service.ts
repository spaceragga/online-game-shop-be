import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(_id: string): Promise<User> {
    return this.usersRepository.findOne({ _id });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { email, password } = user;
    const existUser = await this.usersRepository.findOne({ email });
    if (existUser) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.create({
      email,
      password,
    });
  }

  async updateUser(_id: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ _id }, userUpdates);
  }

  async deleteUserById(_id: string): Promise<User> {
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
