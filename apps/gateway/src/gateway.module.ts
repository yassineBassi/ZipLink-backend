import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'API_SERVICE',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3001 },
      },
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 3002 },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
