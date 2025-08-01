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

type Booking = {
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
  client: Client
  driver: DriverUser
  cancelledBy: null
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
        url: "/driver-booking",
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
