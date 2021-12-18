import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findOne(orderFilterQuery: FilterQuery<OrderDocument>): Promise<Order> {
    return this.orderModel.findOne(orderFilterQuery);
  }

  async find(orderFilterQuery: FilterQuery<OrderDocument>) {
    return this.orderModel.find(orderFilterQuery);
  }

  async create(order: Partial<Order>): Promise<Order> {
    return this.orderModel.create(order);
  }

  async findOneAndUpdate(
    orderFilterQuery: FilterQuery<OrderDocument>,
    order: Partial<Order>,
  ): Promise<Order> {
    return this.orderModel.findOneAndUpdate(orderFilterQuery, order, {
      new: true,
    });
  }

  async delete(id: Partial<Order>): Promise<Order> {
    return this.orderModel.findOneAndDelete(id);
  }
}
