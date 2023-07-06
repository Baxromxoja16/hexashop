import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard, Public } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
