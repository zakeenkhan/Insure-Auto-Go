export type Car = {
  id?: number
  ownerId?: number
  name: string
  carPicture: string
  city: string
  registrationNo: string
  type: string
  makeYear: string
  capacity: number
  Make: string
  fuelType: string
  insured: boolean
  rentPerDay: number
  insuranceRequired: boolean
  carTransmission: string
  ratings?: [
    {
      id: number
      ratedBy: {
        id: number
        fullName: string
        email: string
        isVerified: boolean
        cnic: string
        role: string
        profilePicture: string
        dob: string
        phone: string
      }
      driverId: number | null
      bookingId: number
      carId: number
      rating: string
      review: string
      createdAt: string
      updatedAt: string
    }
  ]
}
export type Booking = {
  id: number
  clientId: number
  carId: number
  driverId: number
  status: string
  isInsured: boolean
  insurance: string | null
  bookingDate: string
  startDate: string
  endDate: string
  totalPrice: number
  isPaid: boolean
  amountPaid: number | null
  cancelledAt: string | null
  cancelledById: number | null
  createdAt: string
  updatedAt: string
  clientContactNo?: string
  car: Car
  driver: Driver
  client: Client
  cancelledBy: User | null
}
export type Client = {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
}

export type User = {
  id: number
  fullName: string
  email: string
  cnic: string
  role: string
  profilePicture: string | null
  isVerified: boolean
  ratingCount: number
  averageRatingGiven: string
  driver: Driver[]
  bookings: Booking[]
}
export type Driver = {
  id: number
  userId: number
  licenseNo: string
  licenseExpiry: string
  licensePicture: string
  lisenceType: string
  driverPicture: string
  averageRating: string
  ratingCount: number
  weightage: string
  createdAt: string
  updatedAt: string
  user?: {
    id: number
    fullName: string
    email: string
    profilePicture: string
    isVerified: boolean
  }
  ratings?: Ratings[]
}
export type Ratings = {
  rating: number
  review: string
}

// conversation

export type Conversation = {
  userId: number
  driverId: number
  createdAt: string
  updatedAt: string
  messages: [
    {
      id: number
      senderId: number
      receiverId: number
      userId: number
      driverId: number
      isSeen: boolean
      content: string
      createdAt: string
      updatedAt: string
      sender: {
        id: number
        fullName: string
        email: string
        isVerified: boolean
        cnic: string
        role: string
        profilePicture: string | null
        dob: string | null
        phone: string | null
      }
      receiver: {
        id: number
        fullName: string
        email: string
        isVerified: boolean
        cnic: string
        role: string
        profilePicture: string | null
        dob: string | null
        phone: string | null
      }
    }
  ]
  user: {
    id: number
    fullName: string
    email: string
    isVerified: boolean
    cnic: string
    role: string
    profilePicture: string | null
    dob: string | null
    phone: string | null
  }
  driver: {
    id: number
    fullName: string
    email: string
    isVerified: boolean
    cnic: string
    role: string
    profilePicture: string | null
    dob: string | null
    phone: string | null
  }
}


// single driver

export type SingleDriver = {
  id: number
  userId: number
  licenseNo: string
  licenseExpiry: string
  licensePicture: string
  lisenceType: string
  driverPicture: string
  averageRating: string
  ratingCount: number
  weightage: string
  per12HoursRate: number
  city: string
  createdAt: string
  updatedAt: string
  user: {
    id: number
    fullName: string
    email: string
    profilePicture: string
    dob: string
    phone: string
    isVerified: boolean
  }
  ratings: []
}

// all booking
type DriverClient = {
  id: number
  fullName: string | null
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
  dob: string
  phone: string
}

type DriverUser = {
  averageRating: string
  city: string
  createdAt: string
  driverPicture: string
  id: number
  licenseExpiry: string
  licenseNo: string
  licensePicture: string
  lisenceType: string
  per12HoursRate: number
  ratingCount: number
  updatedAt: string
  user: {
    id: number
    userId: number
    fullName: string | null
    email: string
    isVerified: boolean
    cnic: string
    role: string
    profilePicture: string | null
    dob: string
    phone: string
  }
}

export type AllDriverBooking = {
  id: number
  clientId: number
  driverId: number
  status: string
  isInsured: false
  insurance: string
  bookingDate: string
  startDate: string
  endDate: string
  totalPrice: number
  isPaid: boolean
  amountPaid: null
  cancelledAt: string
  cancelledById: string
  clientContactNo: string
  createdAt: string
  updatedAt: string
  client: DriverClient
  driver: DriverUser
  cancelledBy: null
}
