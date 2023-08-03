import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ContactDto {
    @ApiProperty({example: "John Cena", description: "name of the client"})
    @IsString()
    name: string;

    @ApiProperty({example: "chnage@gmail.com", description: "email of the client"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "I want partnership with you", description: "intention of the client"})
    @IsString()
    message: string;
}