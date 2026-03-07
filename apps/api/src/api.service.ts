import { Url } from '@app/database';
import { Get, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as UUID } from 'uuid';

@Injectable()
export class ApiService {

  constructor(@InjectRepository(Url) private urlsRepository: Repository<Url>){}

    async shortenURL(url: string) {
      const urlObject = {
        originalUrl: url,
        code: UUID(),
        clickCount: 0
      };
      await this.urlsRepository.save(urlObject);
      return "done";
    }
  
    async getOriginalURL(code: string) {
      const urlObject = await this.urlsRepository.findOne({where: {code}});
      if(!urlObject){
        throw new HttpException('URL not found', 404);
      }
      urlObject.clickCount += 1;
      this.urlsRepository.save(urlObject);
      
      return urlObject.originalUrl;
    }
  
    health() {
      return 'OK';
    }
  
    metrics() {
    }

}
