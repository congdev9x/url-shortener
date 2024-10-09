import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShortUrl } from 'libs/common/entities/short-url.entity';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';

export class ShortUrlService {
  constructor(
    @InjectModel(ShortUrl.name)
    private readonly shortUrlModel: Model<ShortUrl>,
  ) {}

  async create(originalUrl: string): Promise<ShortUrl> {
    const shortCode = nanoid(7);
    const newShortUrl = new this.shortUrlModel({ shortCode, originalUrl });
    return newShortUrl.save();
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    const shortUrl = await this.shortUrlModel.findOne({ shortCode });
    if (!shortUrl) {
      throw new NotFoundException('Short URL not found');
    }
    shortUrl.accessCount += 1;
    await shortUrl.save();
    return shortUrl.originalUrl;
  }

  async updateShortUrl(
    shortCode: string,
    newOriginalUrl: string,
  ): Promise<ShortUrl> {
    const shortUrl = await this.shortUrlModel.findOne({ shortCode });
    if (!shortUrl) {
      throw new NotFoundException('Short URL not found');
    }
    shortUrl.originalUrl = newOriginalUrl;
    return shortUrl.save();
  }

  async deleteShortUrl(shortCode: string): Promise<void> {
    const result = await this.shortUrlModel.deleteOne({ shortCode });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Short URL not found');
    }
  }

  async getStatistics(shortCode: string): Promise<ShortUrl> {
    const shortUrl = await this.shortUrlModel.findOne({ shortCode });
    if (!shortUrl) {
      throw new NotFoundException('Short URL not found');
    }
    return shortUrl;
  }
}
