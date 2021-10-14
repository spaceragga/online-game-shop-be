import { Post, Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('signup')
  async register(@Body() registerDto: CreateUserDto): Promise<string> {
    const user = await this.userService.createUser(registerDto);

    return await this.authService.signPayload(user);
  }

  @Post('signin')
  async login(@Body() userDto: User): Promise<string> {
    const user = await this.userService.findByLogin(userDto);

    return await this.authService.signPayload(user);
  }
}
