import { Controller, Get, Param } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('notices')
  async scrape() {
    return this.scraperService.scrape();
  }

  @Get('home')
  async scrapeData() {
    return this.scraperService.scrapeData();
  }
}
