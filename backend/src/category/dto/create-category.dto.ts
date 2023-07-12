import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'clothes', description: 'category for products' })
  @IsString()
  name: string;

  @ApiProperty({example: "http://sdasdasds.com/sd4342j34bcbf"})
  @IsUrl()
  img: string;

  @ApiProperty({example: [{category: "Shirts"}], description: "subcategories for category"})
  @IsArray()
  subCategories: { category: string }[];
}
