import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'clothes', description: 'category for products' })
  @IsString()
  name: string;

  @ApiProperty({example: [{category: "Shirts"}], description: "subcategories for category"})
  @IsArray()
  subCategories: { category: string }[];
}
