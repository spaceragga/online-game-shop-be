import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type DeveloperDocument = Developer & Document;
@Schema()
export class Developer {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  releasedGames: string[];

  @Prop()
  foundationDate: string;

  @Prop()
  image: string;
}

export const DeveloperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  releasedGames: [String],
  foundationDate: { type: String, required: true },
  image: { type: String, required: true },
});
