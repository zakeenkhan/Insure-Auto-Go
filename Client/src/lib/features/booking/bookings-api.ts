import { Api } from "@/lib/api"
import cookie from "react-cookies"

type Meta = {
  totalPages: number
  totalRecords: number
  currentPage: number
}

type Client = {
  id: number
  fullName: string | null
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
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

type DriverUser = {
  id: number
  fullName: string | null
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
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
  user: DriverUser
}

type Booking = {
  id: number
  clientId: number
  carId: number
  driverId: number | null
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
  client: Client
  car: Car
  driver: Driver | null
  cancelledBy: string | null
}

type BookingsResponse = {
  data: Booking[]
  meta: Meta
}

interface BookingQueryParams {
  pageSize?: number
  page?: number
}
const token = cookie.load("token")
const Bookings = Api.injectEndpoints({
  endpoints: (build) => ({
    allBookings: build.query<BookingsResponse, BookingQueryParams>({
      query: (params) => ({
        url: "/booking",
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["carBooking"],
      transformResponse: (response: { data: BookingsResponse }) =>
        response.data,
    }),
  }),
})

export const { useAllBookingsQuery } = Bookings

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = Bookings
