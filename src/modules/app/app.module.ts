import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvModule } from '../env/env.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { EnvService } from '../env/env.service';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppResolver } from './app.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [EnvModule],
      driver: ApolloDriver,
      useFactory: async (envService: EnvService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ req }) => ({ req }),
      }),
      inject: [EnvService],
    }),
    EnvModule,
    AuthModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
