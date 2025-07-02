import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './config/env.config';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfig = app.get(EnvConfig);
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(envConfig.port);
  console.log(`Server listening on port: ${envConfig.port}`);
}
bootstrap();
