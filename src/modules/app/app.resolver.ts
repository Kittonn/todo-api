import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver(() => String)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  hello(): string {
    return this.appService.getHello();
  }
}
