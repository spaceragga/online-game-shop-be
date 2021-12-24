import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas/order.schema';
import { getAllOrdersResponse } from './schemas/order.types';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getAllById(req: Request): Promise<Order[]> {
    return this.ordersRepository.findAllById(req);
  }

  async getOrders(req: Request): Promise<getAllOrdersResponse> {
    return this.ordersRepository.find(req);
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create(createOrderDto);
  }

  async updateOrder(_id: string, gameUpdates: UpdateOrderDto): Promise<Order> {
    return this.ordersRepository.findOneAndUpdate({ _id }, gameUpdates);
  }

  async deleteOrderById(_id: string): Promise<Order> {
    return this.ordersRepository.delete({ _id });
  }
}
