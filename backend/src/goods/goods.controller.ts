import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { AuthGuard, Public } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Public()
  @Get()
  findAll() {
    return this.goodsService.findAll();
  }

  @Public()
  @Get('/category/:categoryid')
  findCategory(@Param('categoryid') categoryId: string) {
    return this.goodsService.findCategory(categoryId);
  }

  // @Public()
  // @Get('/category/:categoryid/:subcategoryid')
  // findSubcategory(
  //   @Param('categoryid') categoryId: string,
  //   @Param('subcategoryid') subcategoryId: string,
  // ) {
  //   return this.goodsService.findSubcategory(categoryId, subcategoryId);
  // }

  @Public()
  @Get('/item/:id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(id);
  }

  @Public()
  @Get('/:page')
  pagination(@Param('id') id: string) {
    return this.goodsService.findPage(+id);
  }

  @Public()
  @Post()
  create(@Body() createGoodDto: CreateGoodDto) {
    return this.goodsService.create(createGoodDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(id, updateGoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(id);
  }
}
