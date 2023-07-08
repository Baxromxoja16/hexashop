import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryName, CategoryType } from './model/category.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryName) private categoriesModel: Model<CategoryType>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesModel.create(createCategoryDto);

    return category;
  }

  async findAll() {
    return await this.categoriesModel.find().limit(20);
  }

  async findOne(id: string) {
    await this.checkId(id);
    const category = await this.categoriesModel.findById(id);
    if (!category) throw new NotFoundException('Product is not found');
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesModel.updateOne({ id }, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.categoriesModel.deleteOne({ id });
  }

  private checkId(id: string) {
    if (isValidObjectId(id)) {
      return true;
    }
    throw new BadRequestException('Id is not valid');
  }
}
