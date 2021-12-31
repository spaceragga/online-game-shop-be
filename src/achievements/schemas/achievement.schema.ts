import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AchievementDocument = Achievement & Document;

@Schema()
export class Achievement {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  discount: number;

  @Prop()
  date: Date;
}

export const AchievementSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  discount: { type: Number },
  date: { type: Date, default: Date.now },
});
