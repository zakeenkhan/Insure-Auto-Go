import { BookingStatus } from '@prisma/client';
export declare class UpdateBookingDto {
    totalPrice?: number;
    status?: BookingStatus;
    clientContactNo?: string;
}
