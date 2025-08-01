import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  fullName?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  profilePicture?: string;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  cnic?: string;
}
