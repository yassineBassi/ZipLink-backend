import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiService } from './api.service';
import type { Request, Response } from 'express';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('shorten')
  shortenURL(@Body('url') url: string) {
    return this.apiService.shortenURL(url);
  }

  @Get(':code')
  getOriginalURL(@Param('code') code: string, @Req() request: Request, @Res() response: Response) {
    return this.apiService.getOriginalURL(code, request, response);
  }
  

  @Get('health')
  health() {
    return this.apiService.health();
  }

  @Get('metrics')
  metrics() {
    return this.apiService.metrics();
  }
}
