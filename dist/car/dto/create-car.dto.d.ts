import { CarTransmission, FuelType } from '@prisma/client';
export declare class CreateCarDto {
    name: string;
    carPicture?: string;
    carPublished?: Date;
    city?: string;
    registrationNo: string;
    type?: string;
    makeYear?: string;
    capacity?: number;
    Make?: string;
    fuelType?: FuelType;
    insured?: boolean;
    rentPerDay?: number;
    insuranceRequired?: boolean;
    carTransmission?: CarTransmission;
}
