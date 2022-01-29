import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CommonService } from '../common/common.service';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { GetOrdersByIdQuery } from './dto/order-query.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersRepository extends CommonService<Order> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }

  async findAllById(
    orderFilterQuery: FilterQuery<GetOrdersByIdQuery>,
  ): Promise<Order[]> {
    const { id, sortBy } = orderFilterQuery;

    return this.orderModel.find({ userId: id }).sort([['date', sortBy]]);
  }

  find(
    orderFilterQuery: FilterQuery<GetQueryDTO>,
  ): Promise<PaginatedResponse<Order>> {
    return this.getEntityWithPagination(orderFilterQuery);
  }

  create(order: Partial<Order>): Promise<Order> {
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
