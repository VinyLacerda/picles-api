import { IsEmail, IsString, IsNumberString, Length, IsNotEmpty } from "class-validator"

export default class UpdateShelterControllerInput {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    @Length(10, 11)
    whatsapp: string
    @IsNumberString()
    @IsNotEmpty()
    phone: string
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string
}