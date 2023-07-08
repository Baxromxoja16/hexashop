import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserName, UserType } from './model/user.schema';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { TelegramService, TelegramMessage } from 'nestjs-telegram';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserName) private userModel: Model<UserType>,
    private readonly telegram: TelegramService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.isExists(createUserDto.phone);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    const user = await this.userModel.create(createUserDto);

    return {
      _id: user._id,
      phone: user.phone,
      name: user.name,
    };
  }

  async findOneByPhone(phone: string) {
    const user = await this.userModel.findOne({ phone });
    if (!user) throw new ForbiddenException('Account is not found');
    return user;
  }

  async findAll() {
    return await this.userModel.find().limit(20);
  }

  async findOne(id: string) {
    await this.checkId(id);
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User is not found');
    return user;
  }

  async contactSend(contactDto: ContactDto): Promise<TelegramMessage> {
    const message = `
    <b>${contactDto.name}</b>\n<i>${contactDto.email}</i>\n${contactDto.message}\nType: <tg-emoji emoji-id="121323">🧑‍💼</tg-emoji>Client
    `;
    const chat_id = 635762695;
    const res = await this.telegram
      .sendMessage({ chat_id, text: message, parse_mode: 'html' })
      .toPromise();
    return res;
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

  private checkId(id: string) {
    if (isValidObjectId(id)) {
      return true;
    }
    throw new BadRequestException('Id is not valid');
  }

  private async isExists(phone: string) {
    const user = await this.userModel.findOne({ phone });
    if (user) throw new BadRequestException('User phone already exists');
  }
}
