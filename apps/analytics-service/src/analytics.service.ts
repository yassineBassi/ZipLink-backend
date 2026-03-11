import { Url } from '@app/database';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {

  private readonly logger = new Logger(AnalyticsService.name);

  constructor(@InjectRepository(Url) private readonly urlRepository: Repository<Url>) {}

  async getClickAnalytics(code: string) {
    this.logger.log('---------------------------------------');
    this.logger.log('Get click analytics for url code : ' + code);

    const urlObject = await this.urlRepository.findOne({where: {code}, relations: ['clicks']});
    this.logger.log('Url object : ', urlObject);
    if(!urlObject){
      throw new HttpException('URL not found', 404)
    }
    return {
      code: urlObject.code,
      clickCount: urlObject.clicks.length,
      clicks: urlObject.clicks
    }
  }

  health() {
    return 'OK';
  }

  dashboard() {
  }
    
}
