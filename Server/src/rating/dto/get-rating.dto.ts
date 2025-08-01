import {
  IsOptional,
  IsNumber,
  IsString,
  IsInt,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class GetRatingDto extends PaginationDto {
  @ApiPropertyOptional({ default: 4.5 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;
  @ApiPropertyOptional({ default: 'Good' })
  @IsOptional()
  @IsString()
  review?: string;
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  carId?: number;
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  driverId?: number;
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  bookingId?: number;
  @ApiPropertyOptional({ default: 'Good' })
  @IsOptional()
  @IsString()
  search?: string;
}
