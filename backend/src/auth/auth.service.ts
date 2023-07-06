import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthName, AuthType } from './model/auth.schema';
import { UsersService } from 'src/users/users.service';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthName) private authModel: Model<AuthType>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userService.findOneByPhone(loginAuthDto.phone);

    const checkPassword = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!checkPassword) throw new ForbiddenException('Password is incorrect');
    await this.checkTokenAndDelete(user._id);

    const payload = { phone: user.phone, id: user.id };
    const refreshToken = await this.jwtService.signAsync(payload);
    await this.authModel.create({ refreshToken, userId: user.id });
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  async register(registerAuthDto: CreateUserDto) {
    const user = await this.userService.create(registerAuthDto);

    const payload = { phone: user.phone, id: user._id };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    await this.authModel.create({ refreshToken, userId: user._id });
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
    };
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    const tokenFromDB = await this.authModel.findOne({
      userId: refreshAuthDto.userId,
    });

    if (!tokenFromDB) throw new UnauthorizedException('User is not authorized');

    let payload: null | {
      phone: string;
      userId: Types.ObjectId;
      exp: number;
      ait: number;
    };

    try {
      payload = await this.jwtService.verifyAsync(refreshAuthDto.refreshToken);
    } catch (err) {
      await this.authModel.findOneAndDelete({
        userId: refreshAuthDto.userId,
      });
      throw new UnauthorizedException('Token is not valid');
    }

    const refreshToken = await this.jwtService.signAsync(
      {
        phone: payload?.phone,
        userId: payload?.userId,
      },
      {
        expiresIn: '7d',
      },
    );

    await tokenFromDB.$set({ refreshToken });
    await tokenFromDB.save();

    return {
      accessToken: await this.jwtService.signAsync({ userId: payload.userId, phone: payload.userId }),
      refreshToken,
    };
  }

  private async checkTokenAndDelete(userId: string) {
    await this.authModel.findOneAndDelete({ userId });
  }
}
