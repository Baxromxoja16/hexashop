import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryName, CategoryType } from 'src/category/model/category.schema';
import { GoodsName, GoodsType } from 'src/goods/model/good.schema';
import { UserName, UserType } from 'src/users/model/user.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(CategoryName) private categoriesModel: Model<CategoryType>,
    @InjectModel(GoodsName) private goodsModel: Model<GoodsType>,
    @InjectModel(UserName) private usersModel: Model<UserType>,
  ) {}
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
          category: 1,
          income: { $multiply: ['$sold', '$price'] },
        },
      },
      {
        $group: {
          _id: '$category',
        },
      },
    ]);
  }

  async allCount() {
    const category = await this.categoriesModel.countDocuments();
    const user = await this.usersModel.countDocuments();
    const goodAmountAndSold = await this.goodsModel.aggregate([
      {
        $project: {
          multipliedField: { $multiply: ['$sold', '$price'] },
          sold: 1,
        },
      },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
          allPrice: { $sum: '$multipliedField' },
          sold: { $sum: '$sold' },
        },
      },
      {
        $project: {
          _id: 0,
          totalCount: 1,
          allPrice: 1,
          sold: 1,
        },
      },
    ]);

    return {
      category,
      user,
      goods: goodAmountAndSold,
    };
  }

  private getLastWeeksDate() {
    const now = new Date();

    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  async findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }
}
