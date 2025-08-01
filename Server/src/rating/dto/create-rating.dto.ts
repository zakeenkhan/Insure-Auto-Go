import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  IsPositive,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
export class CreateRatingDto {
  @ApiProperty({ default: 1 })
  @IsInt()
  @IsPositive()
  bookingId: number;

  @ApiProperty({ default: 4.5 })
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  rating: number;
  @ApiPropertyOptional({ default: 'Good' })
  @IsOptional()
  @IsString()
  review?: string;
}
