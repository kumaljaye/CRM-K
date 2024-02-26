import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateToDoDto {
    
    @ApiProperty()
    @IsString()
    title: string;
}
