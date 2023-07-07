import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodsName, GoodsSchema } from './model/good.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GoodsName, schema: GoodsSchema, collection: GoodsName },
    ]),
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
