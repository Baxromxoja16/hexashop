import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryName, CategorySchema } from './model/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryName, schema: CategorySchema, collection: CategoryName },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
