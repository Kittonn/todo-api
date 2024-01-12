import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TasksRepository } from './tasks.repository';

@Module({
  providers: [TasksResolver, TasksService, TasksRepository],
})
export class TasksModule {}
