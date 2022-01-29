import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders/orders.repository';
import { Order } from '../orders/schemas/order.schema';
import { Sort } from '../types/main.types';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class CheckAchievementsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}
  async checkAchievements(id: string) {
    const [userPurchases, user] = await Promise.all([
      this.ordersRepository.findAllById({ id, sortBy: Sort.desc }),
      this.usersRepository.findOne({ _id: id }),
    ]);

    if (!user.gotAchievements.includes('get 5')) {
      return this.getFivePurchases(userPurchases, id);
    }
  }

  async getFivePurchases(userPurchases, id) {
    const numberPurchases = userPurchases.reduce((acc: number, item: Order) => {
      return acc + item.amount;
    }, 0);

    if (numberPurchases >= 5) {
      await this.usersRepository.findOneAndUpdate(
        { _id: id },
        {
          gotAchievements: ['get 5'],
        },
      );
      return ['get 5'];
    }
  }
}
