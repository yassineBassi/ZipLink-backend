import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticsModule);
  await app.listen(3002);
  console.log('Analytics service running on port 3002');
}
bootstrap();
