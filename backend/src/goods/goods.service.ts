import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsName, GoodsType } from './model/good.schema';
import { Model } from 'mongoose';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(GoodsName) private goodsModel: Model<GoodsType>) {}
  create(createGoodDto: CreateGoodDto) {
    return 'This action adds a new good';
  }

  findAll() {
    return `This action returns all goods`;
  }

  findOne(id: string) {
    return `This action returns a #${id} good`;
  }

  update(id: string, updateGoodDto: UpdateGoodDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: string) {
    return `This action removes a #${id} good`;
  }
}
