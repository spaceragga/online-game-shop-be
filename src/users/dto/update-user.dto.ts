import { Role } from '../schemas/role.enum';

export class UpdateUserDto {
  password: string;
  role: Role;
  isBlocked: boolean;
}
