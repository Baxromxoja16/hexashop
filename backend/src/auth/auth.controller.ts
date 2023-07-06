import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/register')
  register(@Body() registerAuthDto: CreateUserDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/refresh')
  refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.refresh(refreshAuthDto);
  }
}
