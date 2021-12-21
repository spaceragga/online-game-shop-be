import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { getAllOrdersResponse } from './schemas/order.types';
@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findOne(orderFilterQuery: FilterQuery<OrderDocument>): Promise<Order> {
    return this.orderModel.findOne(orderFilterQuery);
  }

  async find(
    orderFilterQuery: FilterQuery<OrderDocument>,
  ): Promise<getAllOrdersResponse> {
    const { page, limit, sortBy, sortRow } = orderFilterQuery.query;
    const total = await this.orderModel.count();

    const items = await this.orderModel
      .find()
      .sort([[sortRow, sortBy]])
      .skip(parseInt(page) * parseInt(limit))
      .limit(parseInt(limit))
      .exec();
    return {
      items,
      total,
    };
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
