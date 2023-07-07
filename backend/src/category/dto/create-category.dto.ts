import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'clothes', description: 'category for products' })
  @IsString()
  name: string;
}
