"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBookingDefaultSelectors = exports.DriverDefaultSelectors = exports.CarDefaultSelectors = exports.BookingDefaultSelectors = exports.UserDefaultSelectors = void 0;
exports.UserDefaultSelectors = {
    id: true,
    fullName: true,
    email: true,
    isVerified: true,
    cnic: true,
    role: true,
    profilePicture: true,
    dob: true,
    phone: true
};
exports.BookingDefaultSelectors = {
    client: {
        select: {
            id: true,
            fullName: true,
            email: true,
            isVerified: true,
            cnic: true,
            role: true,
            profilePicture: true,
            dob: true,
            phone: true
        },
    },
    car: true,
    driver: {
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    isVerified: true,
                    cnic: true,
                    role: true,
                    profilePicture: true,
                    dob: true,
                    phone: true
                },
            },
        },
    },
    cancelledBy: {
        select: {
            id: true,
            fullName: true,
            email: true,
            isVerified: true,
            cnic: true,
            role: true,
            profilePicture: true,
            dob: true,
            phone: true
        },
    },
};
exports.CarDefaultSelectors = {
    ratings: {
        include: {
            'ratedBy': {
                select: exports.UserDefaultSelectors
            }
        }
    },
    bookings: {
        orderBy: {
            bookingDate: 'desc',
        },
    },
    owner: {
        select: {
            id: true,
            email: true,
            fullName: true,
            cnic: true,
            profilePicture: true,
            driver: true,
        },
    },
};
exports.DriverDefaultSelectors = {
    user: {
        select: {
            id: true,
            fullName: true,
            email: true,
            profilePicture: true,
            dob: true,
            phone: true,
            isVerified: true,
        },
    },
    ratings: {
        select: {
            ratedBy: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    profilePicture: true,
                    isVerified: true,
                    dob: true,
                    phone: true
                },
            },
            rating: true,
        },
    },
};
exports.DriverBookingDefaultSelectors = {
    client: {
        select: {
            id: true,
            fullName: true,
            email: true,
            isVerified: true,
            cnic: true,
            role: true,
            profilePicture: true,
            dob: true,
            phone: true
        },
    },
    driver: {
        include: {
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    isVerified: true,
                    cnic: true,
                    role: true,
                    profilePicture: true,
                    dob: true,
                    phone: true
                },
            },
        },
    },
    cancelledBy: {
        select: {
            id: true,
            fullName: true,
            email: true,
            isVerified: true,
            cnic: true,
            role: true,
            profilePicture: true,
            dob: true,
            phone: true
        },
    },
};
//# sourceMappingURL=common-selectors.constant.js.map