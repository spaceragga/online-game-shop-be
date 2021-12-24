import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PaginatedResponse } from '../types/main.types';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getAllById(req: Request): Promise<Order[]> {
    return this.ordersRepository.findAllById(req);
  }

  async getOrders(req: Request): Promise<PaginatedResponse<Order>> {
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
