export declare class CreateBookingDto {
    carId: number;
    driverId?: number;
    isInsured: boolean;
    insurance: string;
    bookingDate: Date;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    clientContactNo: string;
}
