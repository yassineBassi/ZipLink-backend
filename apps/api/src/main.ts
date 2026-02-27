import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    },
  );
  await app.listen();
  console.log('API microservice is listening on port 3001');
}
bootstrap();
