import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { getAllUsersResponse } from './schemas/user.types';
import { UsersService } from './users.service';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(
    usersFilterQuery: FilterQuery<UserDocument>,
  ): Promise<getAllUsersResponse> {
    const { page, limit, sortBy, sortRow } = usersFilterQuery.query;
    const total = await this.userModel.count();

    const items = await this.userModel
      .find()
      .sort([[sortRow, sortBy]])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit))
      .exec();
    return {
      items,
      total,
    };
  }

  async create(user: Partial<User>): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return this.usersService.sanitizeUser(createdUser);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<UserDocument>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }

  async delete(id: Partial<User>): Promise<User> {
    return this.userModel.findOneAndDelete(id);
  }
}
