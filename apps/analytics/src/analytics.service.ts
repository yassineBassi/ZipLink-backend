import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  getAnalytics(data: any) {
    return { message: 'Analytics data', payload: data };
  }
}
