import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshAuthDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTg5Mzk3NTI1NzciLCJpZCI6IjY0YTY2OTUzNTgyNmVjYTIwN2MzYmE4ZSIsImlhdCI6MTY4ODYyNzUzOSwiZXhwIjoxNjg5MjMyMzM5fQ.4sQWGTq6p-Mv32ebBxUkOKSrJQ-N-3CAMNyRsU7daSE',
    description: 'refreshtoken to get new accestoken',
  })
  @IsString()
  refreshToken: string;
}
