import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async setNewRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }
}
