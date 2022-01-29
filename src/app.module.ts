import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { AchievementsModule } from './achievements/achievements.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary';
import { DevelopersModule } from './developers/developers.module';

const MONGODB_URL = config.get<string>('CONNECTIONS.MONGODB.URL');

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UsersModule,
    GamesModule,
    AuthModule,
    OrdersModule,
    AchievementsModule,
    CloudinaryModule,
    DevelopersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
