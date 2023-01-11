import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

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

  setupSwagger(app);
  await app.listen(process.env.PORT || 3000);

  logger.log(`Server application start`);
}
bootstrap();
