import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field((type) => String)
  accessToken: string;

  @Field((type) => String)
  refreshToken: string;
}
