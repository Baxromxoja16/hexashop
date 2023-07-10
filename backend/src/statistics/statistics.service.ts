import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryName, CategoryType } from 'src/category/model/category.schema';
import { GoodsName, GoodsType } from 'src/goods/model/good.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(CategoryName) private categoriesModel: Model<CategoryType>,
    @InjectModel(GoodsName) private goodsModel: Model<GoodsType>,
  ) {}
  async countGoods() {
    return await this.goodsModel.countDocuments();
  }

  private getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  async findLastWeekGoods() {
    return await this.goodsModel.aggregate([
      {
        $match: {
          updatedAt: { $gte: this.getLastWeeksDate() },
        },
      },
      {
        $project: {
          name: 1,
          updatedAt: 1,
          availableAmount: 1,
          sold: 1,
          income: { $multiply: ['$sold', '$price'] },
        },
      },
    ]);
  }

  async findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }
}
