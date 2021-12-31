import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from '../types/main.types';
import { GetQueryDTO } from '../types/validators';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersByIdQuery } from './dto/order-query.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getAllById(queryParams: GetOrdersByIdQuery): Promise<Order[]> {
    return this.ordersRepository.findAllById(queryParams);
  }

  getOrders(queryParams: GetQueryDTO): Promise<PaginatedResponse<Order>> {
    return this.ordersRepository.find(queryParams);
  }

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create(createOrderDto);
  }

  updateOrder(_id: string, gameUpdates: UpdateOrderDto): Promise<Order> {
    return this.ordersRepository.findOneAndUpdate({ _id }, gameUpdates);
  }

  deleteOrderById(_id: string): Promise<Order> {
    return this.ordersRepository.delete({ _id });
  }
}
