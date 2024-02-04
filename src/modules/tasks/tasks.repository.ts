import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return await this.prisma.task.create({ data });
  }

  async findOne(params: {
    where: Prisma.TaskWhereUniqueInput;
    select?: Prisma.TaskSelect;
    include?: Prisma.TaskInclude;
  }): Promise<Task | null> {
    return await this.prisma.task.findUnique({ ...params });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
    select?: Prisma.TaskSelect;
    include?: Prisma.TaskInclude;
  }): Promise<Task[]> {
    return await this.prisma.task.findMany({ ...params });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
    select?: Prisma.TaskSelect;
    include?: Prisma.TaskInclude;
  }): Promise<Task> {
    return await this.prisma.task.update({ ...params });
  }

  async delete(params: { where: Prisma.TaskWhereUniqueInput }): Promise<Task> {
    return await this.prisma.task.delete({ ...params });
  }
}
