import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../test/utils/MongooseTestModule';
import { Game, GameDocument, GameSchema } from './schemas/game.schema';
import { fakeOneGame, fakeManyGames } from '../../test/utils/mockData';
import { Model } from 'mongoose';
import { GamesModule } from './games.module';
import { convertDBRecord2JSON } from '../../test/utils/convertDBRecord2JSON';

describe('GamesController', () => {
  const GAME_COUNT = 3;
  let app: INestApplication;
  let gameModel: Model<GameDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
        GamesModule,
      ],
    }).compile();

    gameModel = module.get<Model<GameDocument>>(getModelToken(Game.name));
    app = module.createNestApplication();
    await app.init();
    await Promise.all(
      fakeManyGames(GAME_COUNT).map((game) => gameModel.create(game)),
    );
  });

  describe('test GET controller', () => {
    test('should get all games', async () => {
      const gamesResponse = await request(app.getHttpServer())
        .get('/games')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(gamesResponse.status).toEqual(200);
      expect(Array.isArray(gamesResponse.body)).toBeTruthy();
      expect(gamesResponse.body.length).toBe(GAME_COUNT);
    });
  });

  describe('test POST controller', () => {
    const newGame = fakeOneGame();

    test('then it should create game', async () => {
      const gameResponse = await request(app.getHttpServer())
        .post('/games')
        .set('Accept', 'application/json')
        .send(newGame)
        .expect(201)
        .expect('Content-Type', /json/);

      const gameDbRecord = await gameModel.findById(gameResponse.body._id);
      expect(gameDbRecord).toHaveProperty('_id');
      expect(gameResponse.body).toMatchObject(
        convertDBRecord2JSON(gameDbRecord),
      );
    });
  });

  describe('test GET(:id) controller', () => {
    let allDbGames;

    beforeAll(async () => {
      allDbGames = await gameModel.find({});
    });

    test('then it should get game by id', async () => {
      const gameResponse = await request(app.getHttpServer())
        .get(`/games/${allDbGames[0]._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(gameResponse.body).toBeInstanceOf(Object);
      expect(gameResponse.body.name).toEqual(allDbGames[0].name);
    });
  });

  describe('test PATCH(:id) controller', () => {
    let allDbGames;

    beforeAll(async () => {
      allDbGames = await gameModel.find({});
    });

    test('then it should update game by id', async () => {
      const gameResponse = await request(app.getHttpServer())
        .patch(`/games/${allDbGames[0]._id}`)
        .set('Accept', 'application/json')
        .send({ name: 'Test Game' })
        .expect(200)
        .expect('Content-Type', /json/);

      expect(allDbGames[0].name).not.toBe(gameResponse.body.name);
    });
  });

  describe('test DELETE(:id) controller', () => {
    let allDbGames;

    beforeAll(async () => {
      allDbGames = await gameModel.find({});
    });

    test('then it should delete game by id', async () => {
      await request(app.getHttpServer())
        .delete(`/games/${allDbGames[0]._id}`)
        .expect(200 || 204);

      const findDeletedGameDb = await gameModel.findById(allDbGames[0]._id);
      expect(await gameModel.find({})).toHaveLength(allDbGames.length - 1);
      expect(findDeletedGameDb).toBeFalsy();
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
