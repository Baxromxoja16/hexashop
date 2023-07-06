import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Body
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard, Public } from 'src/auth/guards/auth.guard';
import { ContactDto } from './dto/contact.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post("contact")
  contactSend(@Body() contactDto: ContactDto) {
    return this.usersService.contactSend(contactDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
