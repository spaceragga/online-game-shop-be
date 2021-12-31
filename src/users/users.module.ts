import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UsersService } from './users.service';
import { UsersGateway } from './users.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    CloudinaryModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersGateway],
  exports: [UsersService],
})
export class UsersModule {}
