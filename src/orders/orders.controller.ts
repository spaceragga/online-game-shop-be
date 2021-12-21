import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';
import { getAllOrdersResponse } from './schemas/order.types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  async getOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Get()
  async getOrders(@Req() req: Request): Promise<getAllOrdersResponse> {
    return this.ordersService.getOrders(req);
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.deleteOrderById(id);
  }
}