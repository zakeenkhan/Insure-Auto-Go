import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class GetDriverDto extends PaginationDto {
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  city?: string;
  
}
