import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { RegisterInput } from './dto/inputs/register.input';
import { LoginInput } from './dto/inputs/login.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    console.log(registerInput);
  }

  @Mutation(() => Auth)
  async login(@Args('loginInput') loginInput: LoginInput) {
    console.log(loginInput);
  }
}
