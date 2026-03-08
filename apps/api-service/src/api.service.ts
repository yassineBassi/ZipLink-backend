import { Url } from '@app/database';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as UUID } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ApiService {

  private readonly logger = new Logger(ApiService.name);

  constructor(
    @InjectRepository(Url) private urlsRepository: Repository<Url>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async shortenURL(url: string) {
    this.logger.log(`Shortening URL: ${url}`);

    const urlObject = {
      originalUrl: url,
      code: UUID().slice(0, 8),
      clickCount: 0
    };

    await this.urlsRepository.save(urlObject);
    this.logger.log(`URL saved with code: ${urlObject.code}`);

    return {
      code: urlObject.code
    };
  }

  async incrementClickCount(code: string) {
    const urlObject = await this.urlsRepository.findOne({where: {code}});
    if(urlObject){
      urlObject.clickCount += 1;
      await this.urlsRepository.save(urlObject);
      this.logger.debug(`Click count incremented for code: ${code} -> ${urlObject.clickCount}`);
    }
    return urlObject;
  }

  async getOriginalURL(code: string) {
    this.logger.log(`Resolving URL for code: ${code}`);

    const cached = await this.cacheManager.get<string>(code);
    if (cached) {
      this.logger.debug(`Cache hit for code: ${code}`);
      this.incrementClickCount(code);
      return cached;
    }

    this.logger.debug(`Cache miss for code: ${code}`);

    const urlObject = await this.incrementClickCount(code);

    if(!urlObject){
      this.logger.warn(`URL not found for code: ${code}`);
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
