import { Task } from '@/modules/tasks/models/task.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  name: string;

  @Field((type) => [Task])
  tasks: Task[];

  @Field((type) => String)
  createdAt: Date;

  @Field((type) => String)
  updatedAt: Date;
}
