import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../schemas/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(7)
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  isBlocked: boolean;

  @IsDate()
  date: Date;

  @IsString()
  profilePhoto: string;

  @IsArray()
  gotAchievements: string[];

  @IsInt()
  discount: number;
}
