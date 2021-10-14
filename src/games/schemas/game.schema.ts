import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type GameDocument = Game & Document;
@Schema()
export class Game {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  year: number;

  @Prop()
  gameDev: string;

  @Prop()
  description: string;

  @Prop()
  genre: string;

  @Prop()
  rating: number;

  @Prop()
  ageRating: number;

  @Prop()
  price: number;

  @Prop()
  amount: number;
}

export const GameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  gameDev: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  ageRating: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
});
