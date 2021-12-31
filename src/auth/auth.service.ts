import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import * as config from 'config';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JwtConfig } from '../../config/config.types';

const JWT = config.get<JwtConfig>('JWT');

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(user): Promise<string> {
    const payload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      profilePhoto: user.profilePhoto,
    };
    return sign(payload, JWT.SECRET, { expiresIn: JWT.EXPIRES });
  }
  async validateUser(payload): Promise<User> {
    return await this.userService.findByPayload(payload);
  }
}
