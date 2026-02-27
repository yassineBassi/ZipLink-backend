import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AnalyticsModule } from './analytics.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AnalyticsModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    },
  );
  await app.listen();
  console.log('Analytics microservice is listening on port 3002');
}
bootstrap();
