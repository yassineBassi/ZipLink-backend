import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('API_SERVICE') private readonly apiClient: ClientProxy,
    @Inject('ANALYTICS_SERVICE') private readonly analyticsClient: ClientProxy,
  ) {}

  @Get('api/hello')
  getHello() {
    return this.apiClient.send({ cmd: 'get_hello' }, {});
  }

  @Get('analytics')
  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
