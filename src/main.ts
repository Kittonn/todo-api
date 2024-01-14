import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { EnvService } from './modules/env/env.service';
import { ValidationPipe } from '@nestjs/common';
import { Environment } from './shared/enums/environment.enum';
import { PrismaClientExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  const nodeEnv = envService.get('NODE_ENV');
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: nodeEnv === Environment.DEVELOPMENT,
    }),
  );

  await app.listen(port);
}
bootstrap();
