import { Prisma } from '@prisma/client';
export declare const UserDefaultSelectors: {
    id: boolean;
    fullName: boolean;
    email: boolean;
    isVerified: boolean;
    cnic: boolean;
    role: boolean;
    profilePicture: boolean;
    dob: boolean;
    phone: boolean;
};
export declare const BookingDefaultSelectors: Prisma.BookingInclude;
export declare const CarDefaultSelectors: Prisma.CarInclude;
export declare const DriverDefaultSelectors: Prisma.DriverInclude;
export declare const DriverBookingDefaultSelectors: Prisma.DriverBookingInclude;
