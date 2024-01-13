import { User } from '@/modules/users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/shared/models/base.model';

@ObjectType()
export class Task extends BaseModel {
  @Field((type) => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field((type) => Boolean)
  completed: boolean;

  @Field((type) => User)
  user: User;
}
