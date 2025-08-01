import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 10 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  pageSize: number;
  @ApiProperty({ default: 1 })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}
