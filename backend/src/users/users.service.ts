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
import { AdminName, AdminType } from './model/admin.schema';
import { BuyGoodsDto } from './dto/buy-good.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserName) private userModel: Model<UserType>,
    @InjectModel(AdminName) private adminModel: Model<AdminType>,
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

  async adminCreate(createAdminDto: CreateUserDto) {
    await this.isAdminExists(createAdminDto.phone);
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 12);
    const admin = await this.adminModel.create(createAdminDto);

    return {
      _id: admin._id,
      phone: admin.phone,
      name: admin.name,
    };
  }

  async findOneByPhone(phone: string) {
    const user = await this.userModel.findOne({ phone });
    if (!user) throw new ForbiddenException('Account is not found');
    return user;
  }

  async findAdminByPhone(phone: string) {
    const admin = await this.adminModel.findOne({ phone });
    if (!admin) throw new ForbiddenException('Account is not found');
    return admin;
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

  async buy(buyGoods: BuyGoodsDto) {
    const message = `
    <b>${buyGoods.name}</b>\n<i>${
      buyGoods.phone
    }</i>\n<b>List:</b>\n${buyGoods.list
      .map((item) => {
        return `   <b>name</b>: ${item.name}\n   <b>amount</b>: ${item.amount}\n   <b>price</b>: ${item.price}\n\n`;
      })
      .join('')}<b>Total price</b>: $${
      buyGoods.totalPrice
    }\n<b>Type</b>: Customer Purchase <tg-emoji emoji-id="121323">🛒✅</tg-emoji>
    `;
    const chat_id = 635762695;
    const res = await this.telegram
      .sendMessage({ chat_id, text: message, parse_mode: 'html' })
      .toPromise();
    return res;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      return user;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    return await this.userModel.deleteOne({ _id: id });
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

  private async isAdminExists(phone: string) {
    const user = await this.adminModel.findOne({ phone });
    if (user) throw new BadRequestException('User phone already exists');
  }
}
