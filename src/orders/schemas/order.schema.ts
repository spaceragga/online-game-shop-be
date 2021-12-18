import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/games/schemas/game.schema';
import { OrderInfo, OrderInfoSchema } from './orderInfo.schema';

export type OrderDocument = Order & Document;
@Schema()
export class Order {
  @Prop()
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  orderInfo: OrderInfo;

  @Prop()
  email: string;

  @Prop()
  orders: Game[];

  @Prop()
  amount: number;

  @Prop()
  fullPrice: number;

  @Prop()
  date: Date;
}

export const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true },
  orderInfo: OrderInfoSchema,
  orders: [GameSchema],
  amount: { type: Number },
  fullPrice: { type: Number },
  date: { type: Date, default: Date.now },
});
