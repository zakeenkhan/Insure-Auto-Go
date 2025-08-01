import { PaginationDto } from '../../utils/dto/pagination.dto';
import { BookingStatus } from '@prisma/client';
export declare class GetBookingDto extends PaginationDto {
    search?: string;
    status?: BookingStatus;
    isInsured?: boolean;
    bookingDate?: Date;
    startDate?: Date;
    endDate?: Date;
    totalPrice?: number;
    isPaid?: boolean;
    driverId?: number;
}
