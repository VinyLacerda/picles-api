import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';


export default class CreatePetControllerInput {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Name the pet' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Type the pet' })
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Size the pet' })
    size: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Gender the pet' })
    gender: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1024)
    @ApiProperty({ description: 'Bio the pet' })
    bio: string;
}