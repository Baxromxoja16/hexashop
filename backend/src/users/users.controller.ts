import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ContactDto } from './dto/contact.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { BuyGoodsDto } from './dto/buy-good.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('contact')
  contactSend(@Body() contactDto: ContactDto) {
    return this.usersService.contactSend(contactDto);
  }

  @Post('buy')
  buy(@Body() buyGoodsDto: BuyGoodsDto) {
    return this.usersService.buy(buyGoodsDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
