import { Url } from '@app/database';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as UUID } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ApiService {

  constructor(
    @InjectRepository(Url) private urlsRepository: Repository<Url>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  
  async shortenURL(url: string) {
    console.log("shorten url api");
    
    const urlObject = {
      originalUrl: url,
      code: UUID().slice(0, 8),
      clickCount: 0
    };
    console.log("url object", urlObject);
    
    await this.urlsRepository.save(urlObject);
    console.log("saved");
    
    return {
      code: urlObject.code
    };
  }

  async incrementClickCount(code){
    const urlObject = await this.urlsRepository.findOne({where: {code}});
    if(urlObject){
      urlObject.clickCount += 1;
      await this.urlsRepository.save(urlObject);
      console.log("url object click count", urlObject.clickCount)
    }
    return urlObject;
  }

  async getOriginalURL(code: string) {
    console.log("get original url");
    console.log("code is ", code);

    try{
      const cached = await this.cacheManager.get<string>(code);
    }catch(e){
      console.log(e)
    }
    let cached = null;
    if (cached) {
      console.log("cache hit for", code);
      console.log('cached value : ', cached);
      this.incrementClickCount(code);
      return cached;
    }
    
    console.log('cache miss for ', code)

    const urlObject = await this.incrementClickCount(code);

    console.log("url object is ", urlObject);

    if(!urlObject){
      throw new HttpException('URL not found', 404);
    }

    this.cacheManager.set(code, urlObject.originalUrl);

    return urlObject.originalUrl;
  }

  health() {
    return 'OK';
  }

  metrics() {
  }

}
