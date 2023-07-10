import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({example: "+998939743454", description: "phone number"})
    @IsString()
    phone: string;

    @ApiProperty({example: "@buefb34", description: "password to account"})
    @IsStrongPassword()
    password: string;
}
