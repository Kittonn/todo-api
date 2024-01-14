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
import { Environment } from '@/shared/enums/environment.enum';
import { OriginalError } from '@/shared/types/error';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [EnvModule],
      driver: ApolloDriver,
      useFactory: async (envService: EnvService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: false,
        debug: envService.get('NODE_ENV') !== Environment.PRODUCTION,
        introspection: envService.get('NODE_ENV') !== Environment.PRODUCTION,
        plugins:
          envService.get('NODE_ENV') !== Environment.PRODUCTION
            ? [ApolloServerPluginLandingPageLocalDefault()]
            : [],
        includeStacktraceInErrorResponses:
          envService.get('NODE_ENV') !== Environment.PRODUCTION,
        context: ({ req }) => ({ req }),
        formatError: (error) => {
          const originalError = error.extensions
            ?.originalError as OriginalError;

          if (!originalError) {
            return {
              message: error.message,
              statusCode: error.extensions?.code,
            };
          }

          return {
            message: originalError.message,
            statusCode: error.extensions?.code,
          };
        },
      }),
      inject: [EnvService],
    }),
    EnvModule,
    AuthModule,
  ],
  providers: [AppResolver, AppService],
})
export class AppModule {}
