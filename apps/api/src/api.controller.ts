import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @MessagePattern({ cmd: 'get_hello' })
  getHello(@Payload() _data: any) {
    return this.apiService.getHello();
  }
}
