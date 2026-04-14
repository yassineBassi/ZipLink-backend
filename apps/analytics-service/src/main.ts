import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AnalyticsModule } from './analytics.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Analytics service running on port ${port}`);
}
bootstrap();
