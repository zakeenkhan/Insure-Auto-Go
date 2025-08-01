import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {


  @ApiPropertyOptional({ default: 2 })
  @IsInt()
  @IsOptional()
  driverId?: number;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsNotEmpty()
  isInsured: boolean;

  @ApiProperty({ default: 'insurance' })
  @IsString()
  @IsNotEmpty()
  insurance: string;

  @ApiProperty({ default: new Date() })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setHours(5, 0, 0, 0);
    return date;
  })
  bookingDate: Date;

  @ApiProperty({ default: new Date() })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ default: new Date() })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({ default: 1000 })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ default: '03001234567' })
  @IsString()
  @IsNotEmpty()
  clientContactNo: string;
}
