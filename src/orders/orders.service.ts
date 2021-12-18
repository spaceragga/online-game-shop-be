import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async getOrderById(_id: string) {
    return this.ordersRepository.findOne({ _id });
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.create(createOrderDto);
  }

  async updateOrder(_id: string, gameUpdates: UpdateOrderDto) {
    return this.ordersRepository.findOneAndUpdate({ _id }, gameUpdates);
  }

  async deleteOrderById(_id: string) {
    return this.ordersRepository.delete({ _id });
  }
}
