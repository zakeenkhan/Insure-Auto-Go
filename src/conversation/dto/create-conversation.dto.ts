import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {

  IsInt,
  IsNotEmpty,

} from 'class-validator';

export class CreateConversationDto {
    @ApiProperty({ default: 1 })
    @IsInt()
    @IsNotEmpty()
    driverId: number;
}

