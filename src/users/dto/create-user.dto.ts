import { Role } from '../schemas/role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
  date: Date;
}
