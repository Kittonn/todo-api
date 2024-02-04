import {
  BadRequestException,
  Catch,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2000':
        throw new BadRequestException();
      case 'P2002':
        throw new ConflictException();
      case 'P2025':
        throw new NotFoundException();
      default:
        break;
    }
    return exception;
  }
}
