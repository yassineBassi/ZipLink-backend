import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  
  getClickAnalytics(code: string) {
  }

  health() {
    return 'OK';
  }

  dashboard() {
  }
    
}
