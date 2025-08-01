import { CarTransmission, FuelType } from '@prisma/client';
import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
export declare class CustomDateRangeValidator implements ValidatorConstraintInterface {
    validate(isAvailable: boolean, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class GetCarDto extends PaginationDto {
    search?: string;
    ownerId?: number;
    carTransmission?: CarTransmission;
    startDate?: Date;
    endDate?: Date;
    isAvailable?: boolean;
    fuelType?: FuelType;
    make?: string;
    city?: string;
}
