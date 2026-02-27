import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnalyticsService } from './analytics.service';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics(@Payload() data: any) {
    return this.analyticsService.getAnalytics(data);
  }
}
