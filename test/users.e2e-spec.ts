import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { INestApplication } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

describe('getUsers', () => {
  let app: INestApplication;
  let usersService: User;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, async () => {
    const usersResponse = await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(usersResponse.status).toEqual(200);
    expect(Array.isArray(usersResponse.body)).toBeTruthy();
  });

  afterAll(async () => {
    await app.close();
  });
});
