import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterInput } from './dto/inputs/register.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerInput: RegisterInput) {
    const userExists = await this.usersService.findOneByEmail(registerInput.email);

    if (userExists) {
      throw new Error('User already exists');
    }
  }
}
