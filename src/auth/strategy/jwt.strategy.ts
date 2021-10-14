import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback, Strategy } from 'passport-jwt';
import * as config from 'config';
import { AuthService } from '../auth.service';
import { JwtConfig } from '../../../config/config.types';

const JWT = config.get<JwtConfig>('JWT');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.SECRET,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
