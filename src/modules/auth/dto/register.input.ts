import { InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  email: string;

  password: string;

  name: string;
}
