import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { RegisterInput } from './dto/inputs/register.input';
import { LoginInput } from './dto/inputs/login.input';
import { Token } from '@/shared/types/auth';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<Token> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => Auth)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Token> {
    return this.authService.login(loginInput);
  }
}
