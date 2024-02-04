import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async findOne(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
    include?: Prisma.UserInclude;
  }): Promise<User | null> {
    return await this.prisma.user.findUnique({ ...params });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    select?: Prisma.UserSelect;
    include?: Prisma.UserInclude;
  }): Promise<User[]> {
    return await this.prisma.user.findMany({ ...params });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    select?: Prisma.UserSelect;
    include?: Prisma.UserInclude;
  }): Promise<User> {
    return await this.prisma.user.update({ ...params });
  }

  async delete(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    return await this.prisma.user.delete({ ...params });
  }
}
