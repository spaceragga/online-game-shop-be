import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrderInfoDocument = OrderInfo & Document;
@Schema()
export class OrderInfo {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  stateRegion: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;

  @Prop()
  delivery: number;
}

export const OrderInfoSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  stateRegion: { type: String },
  zipCode: { type: String },
  country: { type: String },
  delivery: { type: Number },
});
