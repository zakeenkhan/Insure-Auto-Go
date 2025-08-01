import { Prisma } from '@prisma/client';
export const UserDefaultSelectors  ={
  id: true,
  fullName: true,
  email: true,
  isVerified: true,
  cnic: true,
  role: true,
  profilePicture: true,
  dob:true,
   phone:true
}
export const BookingDefaultSelectors: Prisma.BookingInclude = {
  client: {
    select: {
      id: true,
      fullName: true,
      email: true,
      isVerified: true,
      cnic: true,
      role: true,
      profilePicture: true,
      dob:true,
       phone:true
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
          dob:true,
          phone:true
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
      dob:true,
      phone:true
    },
  },
};

export const CarDefaultSelectors: Prisma.CarInclude = {
  ratings: {
    include:{
      'ratedBy':{
        select:UserDefaultSelectors
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

export const DriverDefaultSelectors: Prisma.DriverInclude = {
  user: {
    select: {
      id: true,
      fullName: true,
      email: true,
      profilePicture: true,
      dob :true,
      phone:true,
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
          dob:true,
          phone:true
        },
      },
      rating: true,
    },
  },
};
export const DriverBookingDefaultSelectors: Prisma.DriverBookingInclude = {
  client: {
    select: {
      id: true,
      fullName: true,
      email: true,
      isVerified: true,
      cnic: true,
      role: true,
      profilePicture: true,
      dob:true,
       phone:true
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
          dob:true,
          phone:true
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
      dob:true,
      phone:true
    },
  },
};

