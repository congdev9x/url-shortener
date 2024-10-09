import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ShortUrl extends Document {
  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ required: true })
  originalUrl: string;

  @Prop({ default: 0 })
  accessCount: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);
