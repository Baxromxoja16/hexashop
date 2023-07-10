import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthName, AuthType } from './model/auth.schema';
import { UsersService } from 'src/users/users.service';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

type PayloadType = {
  phone: string;
  id: string;
};

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

    const payload: PayloadType = { phone: user.phone, id: user.id };
    const { refreshToken, accesToken } = await this.createTokens(
      payload,
      user._id,
    );
    return {
      accesToken,
      refreshToken,
    };
  }

  async loginAdmin(loginAuthDto: LoginAuthDto) {
    const admin = await this.userService.findAdminByPhone(loginAuthDto.phone);

    const checkPassword = await bcrypt.compare(
      loginAuthDto.password,
      admin.password,
    );

    if (!checkPassword) throw new ForbiddenException('Password is incorrect');
    await this.checkTokenAndDelete(admin._id);

    const payload: PayloadType = { phone: admin.phone, id: admin._id };
    const { refreshToken, accesToken } = await this.createTokensForAdmin(
      payload,
      admin._id,
    );
    return {
      accesToken,
      refreshToken,
    };
  }

  async register(registerAuthDto: CreateUserDto) {
    const user = await this.userService.create(registerAuthDto);

    const payload: PayloadType = { phone: user.phone, id: user._id };
    const { refreshToken, accesToken } = await this.createTokens(
      payload,
      user._id,
    );
    return {
      accesToken,
      refreshToken,
    };
  }

  async registerAdmin(registerAuthDto: CreateUserDto) {
    const admin = await this.userService.adminCreate(registerAuthDto);

    const payload: PayloadType = { phone: admin.phone, id: admin._id };
    const { refreshToken, accesToken } = await this.createTokensForAdmin(
      payload,
      admin._id,
    );
    return {
      accesToken,
      refreshToken,
    };
  }

  async refresh(refreshAuthDto: RefreshAuthDto) {
    try {
      const payload: { phone: string; id: string; iat: number; exp: number } =
        await this.jwtService.verifyAsync(refreshAuthDto.refreshToken);
      const { refreshToken, accesToken } = await this.createTokens(
        {
          phone: payload.phone,
          id: payload.id,
        },
        payload.id,
        false,
      );
      await this.authModel.findOneAndReplace(
        { userId: payload.id },
        { refreshToken, userId: payload.id },
      );
      return {
        accesToken,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  async refreshAdmin(refreshAuthDto: RefreshAuthDto) {
    try {
      const payload: { phone: string; id: string; iat: number; exp: number } =
        await this.jwtService.verifyAsync(refreshAuthDto.refreshToken, {secret: jwtConstants.adminSecret});
      const { refreshToken, accesToken } = await this.createTokensForAdmin(
        {
          phone: payload.phone,
          id: payload.id,
        },
        payload.id,
        false,
      );
      await this.authModel.findOneAndReplace(
        { userId: payload.id },
        { refreshToken, userId: payload.id },
      );
      return {
        accesToken,
        refreshToken,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async createTokens(
    payload: PayloadType,
    id: string,
    save: boolean = true,
  ) {
    const tokens = {
      accesToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
    if (save) {
      await this.authModel.create({
        refreshToken: tokens.refreshToken,
        userId: id,
      });
    }
    return tokens;
  }

  private async createTokensForAdmin(
    payload: PayloadType,
    id: string,
    save: boolean = true,
  ) {
    const tokens = {
      accesToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: jwtConstants.adminSecret
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: jwtConstants.adminSecret
      }),
    };
    if (save) {
      await this.authModel.create({
        refreshToken: tokens.refreshToken,
        userId: id,
      });
    }
    return tokens;
  }

  private async checkTokenAndDelete(userId: string) {
    await this.authModel.findOneAndDelete({ userId });
  }
}
