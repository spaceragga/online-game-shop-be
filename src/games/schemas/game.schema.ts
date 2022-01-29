import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

class GameVersion {
  physical: number;
  digital: number;
}

export type GameDocument = Game & Document;
@Schema()
export class Game {
  @Prop()
  quantity: GameVersion;

  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  released: string;

  @Prop()
  gameDev: string;

  @Prop()
  description: string;

  @Prop()
  genre: string;

  @Prop()
  rating: number;

  @Prop()
  ageRating: string;

  @Prop()
  price: number;

  @Prop()
  amount: number;

  @Prop()
  image: string;

  @Prop()
  plannedDiscount: number;

  @Prop()
  plannedDiscountStartsOn: Date;

  @Prop()
  plannedDiscountEndsOn: Date;
}

export const GameSchema = new mongoose.Schema({
  quantity: {
    physical: Number,
    digital: Number,
  },
  name: { type: String, required: true },
  released: { type: String, required: true },
  gameDev: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  ageRating: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  image: { type: String, required: true },
  plannedDiscount: { type: Number, default: 0 },
  plannedDiscountStartsOn: { type: Date, default: Date.now },
  plannedDiscountEndsOn: { type: Date, default: Date.now },
});
