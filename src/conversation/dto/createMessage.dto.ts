import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {

  IsNotEmpty,
  IsString,

} from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ default: '11-2'})
    @IsString()
    @IsNotEmpty()
    convId: string;

    @ApiProperty({ default: 'hello usama '})
    @IsString()
    @IsNotEmpty()
    content: string;
}

