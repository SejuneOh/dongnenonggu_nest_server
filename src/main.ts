import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger();
  app.enableCors({ credentials: true, exposedHeaders: ['access_token'] });
  app
    .enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
    })
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

  await app.listen(3000);
  logger.log('Server application start');
}
bootstrap();
