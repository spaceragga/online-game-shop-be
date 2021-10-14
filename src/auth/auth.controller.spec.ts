import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test/utils/MongooseTestModule';
import { UserSchema, User, UserDocument } from '../users/schemas/user.schema';
import { fakeOneUser, fakeManyUsers } from '../../test/utils/mockData';
import { Model } from 'mongoose';
import { AuthModule } from './auth.module';
import { INestApplication } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

describe('AuthController', () => {
  const USER_COUNT = 3;
  let app: INestApplication;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule,
      ],
    }).compile();

    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    app = module.createNestApplication();
    await app.init();
    await Promise.all(
      fakeManyUsers(USER_COUNT).map((user) => userModel.create(user)),
    );
  });

  describe('test signup/signin controller', () => {
    const newUser = fakeOneUser();
    let userToken: string;

    beforeAll(async () => {
      const userResponse = await request(app.getHttpServer())
        .post('/auth/signup')
        .set('Accept', 'application/json')
        .send(newUser);

      userToken = userResponse.text;
    });

    test('then it should create user', async () => {
      const decodedToken = await decode(userToken, { complete: true });
      const userDbRecord = await userModel.findOne({
        email: decodedToken.payload.email,
      });

      expect(userDbRecord).toHaveProperty('_id');
      expect(userDbRecord.email).toEqual(decodedToken.payload.email);
    });

    test('then it should login user', async () => {
      const userResponse = await request(app.getHttpServer())
        .post('/auth/signin')
        .set('Accept', 'application/json')
        .send(newUser)
        .expect(201);

      expect(typeof userResponse.text).toBe('string');
    });

    test('then it should seen only auth with token', async () => {
      const userResponse = await request(app.getHttpServer())
        .get('/auth/onlyauth')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(userResponse.body).toEqual({});
      expect(userResponse.text).toBe('hidden information');
    });
  });

  describe('then it check anyone/onlyauth routes', () => {
    test('then it can be seen by anyone', async () => {
      await request(app.getHttpServer())
        .get('/auth/anyone')
        .set('Accept', 'application/json')
        .expect(200);
    });

    test('then it should get 401 without token', async () => {
      const userResponse = await request(app.getHttpServer())
        .get('/auth/onlyauth')
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/);

      expect(userResponse.body.message).toBe('Unauthorized');
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
