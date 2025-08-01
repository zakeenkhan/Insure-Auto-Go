import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CarTransmission, FuelType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateCarDto {
  @ApiProperty({ default: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    default:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  })
  @IsString()
  @IsOptional()
  carPicture?: string;

  @ApiPropertyOptional({ default: new Date() })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  carPublished?: Date;

  @ApiPropertyOptional({ default: 'DG Khan' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ default: 'KAA 1234' })
  @IsString()
  @IsNotEmpty()
  registrationNo: string;

  @ApiPropertyOptional({ default: 'Sedan' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ default: '2020' })
  @IsString()
  @IsOptional()
  makeYear?: string;

  @ApiPropertyOptional({ default: 4 })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional({ default: 'Toyota' })
  @IsString()
  @IsOptional()
  Make?: string;

  @ApiPropertyOptional({ default: 'Petrol', enum: FuelType })
  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  insured?: boolean;

  @ApiPropertyOptional({ default: 1000 })
  @IsNumber()
  @IsOptional()
  rentPerDay?: number;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  insuranceRequired?: boolean;

  @ApiPropertyOptional({ default: 'Automatic', enum: CarTransmission })
  @IsEnum(CarTransmission)
  @IsOptional()
  carTransmission?: CarTransmission;
}
