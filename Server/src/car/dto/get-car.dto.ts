import { ApiPropertyOptional } from '@nestjs/swagger';
import { CarTransmission, FuelType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsEnum,
  IsDate,
  ValidateIf,
  Validate,
  IsBoolean,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@ValidatorConstraint({ name: 'CustomDateRangeValidator', async: false })
export class CustomDateRangeValidator implements ValidatorConstraintInterface {
  validate(isAvailable: boolean, args: ValidationArguments) {
    const object = args.object as GetCarDto;

    if (object.startDate && object.endDate) {
      return object.startDate < object.endDate;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'startDate must be less than endDate';
  }
}

export class GetCarDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search for cars by name, model, or Registration Number',
    example: 'Toyota Corolla',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter cars by car type',
    example: 'Sedan',
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  ownerId?: number;

  @ApiPropertyOptional({ default: 'Automatic', enum: CarTransmission })
  @IsEnum(CarTransmission)
  @IsOptional()
  carTransmission?: CarTransmission;

  @ApiPropertyOptional({ default: new Date() })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ValidateIf((o) => o.isAvailable !== undefined)
  startDate?: Date;

  @ApiPropertyOptional({
    default: new Date(new Date().setDate(new Date().getDate() + 30)),
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ValidateIf((o) => o.isAvailable !== undefined)
  endDate?: Date;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      if (value === 'true') return true;
      else if (value === 'false') return false;
    }
    return value;
  })
  @IsBoolean()
  @ValidateIf((o) => o.startDate && o.endDate)
  @Validate(CustomDateRangeValidator, {
    message: 'startDate must be less than endDate',
  })
  isAvailable?: boolean;

  @ApiPropertyOptional({ default: 'Petrol', enum: FuelType })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @ApiPropertyOptional({
    description: 'Search for cars by make',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  make?: string;

  @ApiPropertyOptional({
    description: 'Search for cars by city',
    example: 'DG Khan',
  })
  @IsOptional()
  @IsString()
  city?: string;
}
