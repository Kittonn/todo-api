import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({}), EnvModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
