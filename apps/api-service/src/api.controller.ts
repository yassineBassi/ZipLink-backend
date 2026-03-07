import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('shorten')
  shortenURL(@Body('url') url: string) {
    return this.apiService.shortenURL(url);
  }

  @Get('health')
  health() {
    return this.apiService.health();
  }

  @Get('metrics')
  metrics() {
    console.log('metrics called');
    return this.apiService.metrics();
  }

  @Get(':code')
  getOriginalURL(@Param('code') code: string) {
    console.log('code is: ', code);
    return this.apiService.getOriginalURL(code);
  }
}
