import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { AdminGuard, PublicFromAdmin } from 'src/auth/guards/admin.guard';

@UseGuards(AdminGuard)
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @PublicFromAdmin()
  @Get()
  findAll() {
    return this.goodsService.findAll();
  }

  @PublicFromAdmin()
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

  @PublicFromAdmin()
  @Get('/item/:id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(id);
  }

  @PublicFromAdmin()
  @Get('/search')
  search(@Query('name') name: string) {
    return this.goodsService.search(name);
  }

  @PublicFromAdmin()
  @Get('/:page')
  pagination(@Param('id') id: string) {
    return this.goodsService.findPage(+id);
  }

  @Post()
  create(@Body() createGoodDto: CreateGoodDto) {
    return this.goodsService.create(createGoodDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: UpdateGoodDto) {
    return this.goodsService.update(id, updateGoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(id);
  }
}
