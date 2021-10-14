import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test/utils/MongooseTestModule';
import { UserSchema, User, UserDocument } from './schemas/user.schema';
import { fakeOneUser, fakeManyUsers } from '../../test/utils/mockData';
import { Model } from 'mongoose';
import { UsersModule } from './users.module';

describe('UsersController', () => {
  let controller: UsersController;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UsersModule,
      ],
    }).compile();

    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    controller = module.get<UsersController>(UsersController);
    await Promise.all(fakeManyUsers(3).map((user) => userModel.create(user)));
  });

  describe('test GET controller', () => {
    let users: User[];

    beforeAll(async () => {
      users = await controller.getUsers();
    });

    test('then it should return users', () => {
      expect(users.length).toBeGreaterThan(2);
    });
  });

  describe('test POST controller', () => {
    let createdUser: User;

    beforeAll(async () => {
      createdUser = await controller.createUser(fakeOneUser());
    });

    test('then it should create user', async () => {
      const createdUserDb = await userModel.findById(createdUser._id);
      expect(createdUserDb).toHaveProperty('_id');
    });
  });

  describe('test GET(:id) controller', () => {
    let someUser: User;
    let allUsers: User[];

    beforeAll(async () => {
      allUsers = await controller.getUsers();
      someUser = allUsers[0];
    });

    test('then it should get user by id', () => {
      expect(someUser).toHaveProperty('_id');
    });
  });

  describe('test PATCH(:id) controller', () => {
    let someUser: User;
    let allUsers: User[];

    beforeAll(async () => {
      allUsers = await controller.getUsers();
      someUser = allUsers[0];
    });

    test('then it should update user by id', async () => {
      await controller.updateUser(someUser._id, {
        password: 'newPassword',
      });
      const updatedUserDb = await userModel.findById(someUser._id);
      expect(updatedUserDb).toHaveProperty('_id');
    });
  });

  describe('test DELETE(:id) controller', () => {
    let someUser: User;
    let allUsers: User[];

    beforeAll(async () => {
      allUsers = await controller.getUsers();
      someUser = allUsers[0];
    });

    test('then it should delete user by id', async () => {
      await controller.deleteUser(someUser._id);
      const findDeletedUserDb = await userModel.findById(someUser._id);
      expect(await controller.getUsers()).toHaveLength(allUsers.length - 1);
      expect(findDeletedUserDb).toBeFalsy();
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
