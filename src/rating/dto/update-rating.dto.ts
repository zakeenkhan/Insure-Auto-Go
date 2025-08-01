import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsInt,
  IsPositive,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
export class UpdateRatingDto {
  @ApiPropertyOptional({ default: 4.5 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  rating?: number;
  @ApiPropertyOptional({ default: 'Good' })
  @IsOptional()
  @IsString()
  review?: string;
}
