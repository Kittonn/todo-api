import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  createdAt: Date;

  @Field((type) => String)
  updatedAt: Date;
}
