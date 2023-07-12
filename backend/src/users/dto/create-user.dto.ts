import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsPhoneNumber,
  IsStrongPassword
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Henry',
    description: 'username for user',
  })
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '+998939752573',
    description: 'pgone number for login',
  })
  @IsPhoneNumber()
  @MinLength(6)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '!nisfsf#@',
    description: 'pgone number for login',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
