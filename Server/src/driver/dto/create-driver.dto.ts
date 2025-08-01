import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsNotEmpty ,IsInt} from 'class-validator';

export class CreateDriverDto {
  @ApiProperty({ default: '1234567890' })
  @IsString()
  @IsNotEmpty()
  licenseNo: string;

  @ApiProperty({ default: '2024-01-01' })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  licenseExpiry: Date;

  @ApiPropertyOptional({ default: 'https://example.com/license.jpg' })
  @IsString()
  @IsOptional()
  licensePicture?: string;

  @ApiPropertyOptional({ default: 'A1' })
  @IsString()
  @IsOptional()
  lisenceType?: string;

  @ApiPropertyOptional({ default: 'https://example.com/driver.jpg' })
  @IsString()
  @IsOptional()
  driverPicture?: string;

  @ApiPropertyOptional({ default: 'abbotabad' })
  @IsString()
  @IsOptional()
  city?: string;
  

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  per12HoursRate :number
}

