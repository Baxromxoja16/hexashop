import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GoodsName, GoodsType } from './model/good.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(GoodsName) private goodsModel: Model<GoodsType>) {}
  async create(createGoodDto: CreateGoodDto) {
    await this.checkIfExists(createGoodDto.name);
    this.checkId(createGoodDto.category);
    const good = await this.goodsModel.create(createGoodDto);
    return good;
  }

  async findAll() {
    return await this.goodsModel.find().limit(21);
    return await this.goodsModel.find().limit(21);
  }

  async search(name: string) {
    return await this.goodsModel.find({ $text: { $search: name } });
  }

  async findPage(page: number) {
    if (typeof page === 'number' && page > 0) {
      return await this.goodsModel
        .find()
        .sort({ updatedAt: -1 })
        .skip((page - 1) * 9)
        .limit(9);
    } else {
      throw new BadRequestException("Params is not provided correctly")
    }
  }

  async findOne(id: string) {
    this.checkId(id);
    const good = await this.goodsModel.findById(id);
    if (!good) throw new NotFoundException('Product is not found');
    return good;
  }

  async findCategory(categoryId: string) {
    this.checkId(categoryId);
    const good = await this.goodsModel.find({ category: categoryId });
    if (!good) throw new NotFoundException('Product is not found');
    return good;
  }

  // async findSubcategory(categoryId: string, subcategoryId: string) {}

  async update(id: string, updateGoodDto: UpdateGoodDto) {
    return await this.goodsModel.findByIdAndUpdate(id, updateGoodDto);
  }

  async remove(id: string) {
    return await this.goodsModel.deleteOne({ _id: id });
  }

  private checkId(id: string) {
    if (isValidObjectId(id)) {
      return true;
    }
    throw new BadRequestException('Id is not valid');
  }

  private async checkIfExists(name: string) {
    const good = await this.goodsModel.findOne({ name });
    if (good)
      throw new BadRequestException('Product with this name already exists');
  }
}
