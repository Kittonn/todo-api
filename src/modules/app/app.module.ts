import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvModule } from '../env/env.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { EnvService } from '../env/env.service';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [EnvModule],
      driver: ApolloDriver,
      useFactory: async (envService: EnvService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        playground: envService['NODE_ENV'] === 'development',
        context: ({ req }) => ({ req }),
      }),
      inject: [EnvService],
    }),
    EnvModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
