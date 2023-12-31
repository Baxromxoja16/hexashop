import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateGoodDto {
  @ApiProperty({ example: 'Summer skirt', description: 'product name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://google.com/asduy4DDiRe32432',
    description: 'product images',
  })
  @IsString()
  imageUrls: [];

  @ApiProperty({ example: 100, description: 'available product count' })
  @IsNumber()
  availableAmount: number;

  @ApiProperty({ example: 100, description: 'available product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '121HVh34be238eg', description: 'product category id' })
  @IsString()
  category: string;

  @ApiProperty({
    example:
      'Great product with availible price.\nJust buy one and enjoy using it.',
    description: 'product category',
  })
  @IsString()
  description: string;
}
