import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { EnvService } from './modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  app.enableCors();

  await app.listen(port);
}
bootstrap();
