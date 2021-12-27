import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommonService } from '../common/common.service';
import { PaginatedResponse } from '../types/main.types';
import { GetUsersQuery } from './dto/user-query.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@Injectable()
export class UsersRepository extends CommonService<User> {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {
    super(userModel);
  }

  async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  find(
    usersFilterQuery: FilterQuery<GetUsersQuery>,
  ): Promise<PaginatedResponse<User>> {
    return this.getEntityWithPagination(usersFilterQuery);
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
