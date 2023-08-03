import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class BuyGoodsDto {
  @ApiProperty({ example: 'John Cena', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+998969524577', description: 'User phone' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: [{name: "Summer skirt", amount: 1, price: 200}],
    description: 'Products list',
  })
  @IsArray()
  list: { name: string; amount: number; price: number }[];

  @ApiProperty({ example: 200, description: 'Total price of products' })
  @IsNumber()
  totalPrice: number;
}
