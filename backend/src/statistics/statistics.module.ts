import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodsName, GoodsSchema } from 'src/goods/model/good.schema';
import { CategoryName, CategorySchema } from 'src/category/model/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryName, schema: CategorySchema, collection: CategoryName },
      { name: GoodsName, schema: GoodsSchema, collection: GoodsName },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
