import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiService } from './api.service';
import type { Request, Response } from 'express';
import { register } from 'prom-client';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { CodeParamDto } from './dto/code-param.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('health')
  health() {
    return this.apiService.health();
  }

  @Post('shorten')
  shortenURL(@Body() body: ShortenUrlDto) {
    return this.apiService.shortenURL(body.url);
  }

  @Get('metrics')
  async getMetrics(@Res() response: Response) {
    response.set('Content-Type', register.contentType);
    response.end(await register.metrics());
  }

  @Get(':code')
  getOriginalURL(@Param() params: CodeParamDto, @Req() request: Request) {
    return this.apiService.getOriginalURL(params.code, request);
  }
}
