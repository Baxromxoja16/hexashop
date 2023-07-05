import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserName, UserType } from './model/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserName) private userModel: Model<UserType>) {}
  async create(createUserDto: CreateUserDto) {
    await this.isExists(createUserDto.phone);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userModel.create(createUserDto);

    return {
      phone: user.phone,
      name: user.name,
    };
  }

  async findAll() {
    return await this.userModel.find().limit(20);
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.updateOne({ _id: id }, updateUserDto);
      return user;
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private async isExists(phone: string) {
    const user = await this.userModel.findOne({ phone });
    if (user)
      throw new BadRequestException('User phone already exists');
  }
}
