import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';
import { PaginatedResponse } from '../types/main.types';
import { GetOrdersByIdQuery } from './dto/order-query.dto';
import { GetQueryDTO } from '../types/validators';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/id')
  getOrdersById(@Query() queryParams: GetOrdersByIdQuery): Promise<Order[]> {
    return this.ordersService.getAllById(queryParams);
  }

  @Get()
  getOrders(
    @Query() queryParams: GetQueryDTO,
  ): Promise<PaginatedResponse<Order>> {
    return this.ordersService.getOrders(queryParams);
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Patch(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<Order> {
    return this.ordersService.deleteOrderById(id);
  }
}
