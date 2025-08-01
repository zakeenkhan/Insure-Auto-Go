import { PaginationDto } from '../../utils/dto/pagination.dto';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import moment from 'moment';

export class GetBookingDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search for cars by name, model, or Registration Number',
    example: 'Toyota Corolla',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;

  @ApiPropertyOptional({ default: 'Pending', enum: BookingStatus })
  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Type(() => Boolean)
  isInsured?: boolean;

  @ApiPropertyOptional({ default: new Date() })
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setHours(5, 0, 0, 0);
    return date;
  })
  bookingDate?: Date;

  @ApiPropertyOptional({ default: new Date() })
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setHours(5, 0, 0, 0);
    return date;
  })
  startDate?: Date;

  @ApiPropertyOptional({
    default: new Date(new Date().setDate(new Date().getDate() + 30)),
  })
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setHours(5, 0, 0, 0);
    return date;
  })
  endDate?: Date;

  @ApiPropertyOptional({ default: 1000 })
  @IsOptional()
  @Type(() => Number)
  totalPrice?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @Type(() => Boolean)
  isPaid?: boolean;


  @ApiPropertyOptional({ default: 2 })
  @IsOptional()
  @Type(() => Number)
  driverId?: number;
}
