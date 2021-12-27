import { FilterQuery, Model } from 'mongoose';
import { PaginatedResponse } from '../types/main.types';

export class CommonService<T> {
  private repository: Model<T>;
  constructor(repository) {
    this.repository = repository;
  }

  async getEntityWithPagination(
    options: FilterQuery<T>,
  ): Promise<PaginatedResponse<T>> {
    const { page, limit, sortBy, sortRow } = options;

    const [total, items] = await Promise.all([
      this.repository.countDocuments(),
      this.repository
        .find()
        .sort([[sortRow, sortBy]])
        .skip(parseInt(page) * parseInt(limit))
        .limit(parseInt(limit))
        .exec(),
    ]);

    return { items, total };
  }
}
