import { User } from '@/modules/users/models/user.model';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field((type) => Boolean)
  completed: boolean;

  @Field((type) => User)
  user: User;

  @Field((type) => String)
  createdAt: Date;

  @Field((type) => String)
  updatedAt: Date;
}
