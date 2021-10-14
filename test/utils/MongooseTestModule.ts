import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      const mongo = await MongoMemoryServer.create();
      const mongoUri = mongo.getUri();
      return {
        uri: mongoUri,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};
