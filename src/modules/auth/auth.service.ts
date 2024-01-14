import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterInput } from './dto/inputs/register.input';
import { LoginInput } from './dto/inputs/login.input';
import { EnvService } from '../env/env.service';
import { JwtPayload } from '@/shared/types/jwt';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Token } from '@/shared/types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<Token> {
    const userExists = await this.usersService.findOneByEmail(
      registerInput.email,
    );

    if (userExists) throw new ConflictException('User already exists');

    const user = await this.usersService.createUser(registerInput);

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async login(loginInput: LoginInput): Promise<Token> {
    const user = await this.usersService.findOneByEmail(loginInput.email);

    if (!user) throw new NotFoundException('User does not exist');

    const isPasswordValid = await bcrypt.compare(
      loginInput.password,
      user.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException();

    const accessToken = await this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(userId: string): Promise<string> {
    const payload: JwtPayload = { sub: userId };
    const accessToken = await this.jwtService.sign(payload, {
      secret: this.envService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.envService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
    });

    return accessToken;
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const payload: JwtPayload = { sub: userId };
    const refreshToken = await this.jwtService.sign(payload, {
      secret: this.envService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.envService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
    });

    await this.usersService.setNewRefreshToken(userId, refreshToken);

    return refreshToken;
  }
}
