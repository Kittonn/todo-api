import { Task } from '@/modules/tasks/models/task.model';
import { BaseModel } from '@/shared/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends BaseModel {
  @Field((type) => String)
  email: string;

  @Field((type) => String)
  name: string;

  @Field((type) => [Task])
  tasks: Task[];
}
