import { Controller, Get, Param, Res } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CodeParamDto } from './dto/code-param.dto';
import type { Response } from 'express';
import { register } from 'prom-client';

@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('health')
  health() {
    return this.analyticsService.health();
  }

  @Get('dashboard')
  dashboard() {
    return this.analyticsService.dashboard();
  }

  @Get('metrics')
  async getMetrics(@Res() response: Response) {
    response.set('Content-Type', register.contentType);
    response.end(await register.metrics());
  }

  @Get(':code')
  getClickAnalytics(@Param() params: CodeParamDto) {
    return this.analyticsService.getClickAnalytics(params.code);
  }
}
