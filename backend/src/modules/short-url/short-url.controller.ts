import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { Response } from 'express';

@Controller('urls')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  createUrl(@Body('originalUrl') originalUrl: string) {
    return this.shortUrlService.create(originalUrl);
  }

  @Get('/:shortCode')
  async getOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    const originalUrl = await this.shortUrlService.getOriginalUrl(shortCode);
    if (originalUrl) {
      return res.redirect(originalUrl);
    } else {
      // Handle case where shortCode is not found
      return res.status(404).send('Short URL not found');
    }
  }

  @Put('/:shortCode')
  updateUrl(
    @Param('shortCode') shortCode: string,
    @Body('originalUrl') originalUrl: string,
  ) {
    return this.shortUrlService.updateShortUrl(shortCode, originalUrl);
  }

  @Delete('/:shortCode')
  deleteUrl(@Param('shortCode') shortCode: string) {
    return this.shortUrlService.deleteShortUrl(shortCode);
  }

  @Get('/:shortCode/stats')
  getUrlStats(@Param('shortCode') shortCode: string) {
    return this.shortUrlService.getStatistics(shortCode);
  }
}
