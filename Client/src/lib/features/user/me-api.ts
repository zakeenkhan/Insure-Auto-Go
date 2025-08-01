import { Api } from "@/lib/api"
import cookie from "react-cookies"
type User = {
  id: number
  fullName: string
  email: string
  cnic: string
  role: string
  profilePicture: string
  isVerified: boolean
  ratingCount: number
  averageRatingGiven: string
  driver: Driver[]
  bookings: Booking[]
}

type Driver = {
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
}

type Car = {
  id: number
  name: string
  ownerId: number
  carPicture: string | null
  carPublished: string
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
  averageRating: string
  ratingCount: number
  weightage: string
  createdAt: string
  updatedAt: string
}

type Booking = {
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
  car: Car
  driver: Driver
  client: Client
  cancelledBy: User | null
}

type Client = {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
}

const Me = Api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => {
        const token = cookie.load("token")
        return {
          method: "GET",
          url: `user/me`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["user"],
      transformResponse: (response: { data: User }) => response.data,
    }),
  }),
})

export const { useGetMeQuery } = Me

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = Me
