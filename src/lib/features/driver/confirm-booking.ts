import { Api } from "@/lib/api"
import cookie from "react-cookies"

interface Client {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
}

interface Car {
  id: number
  name: string
  ownerId: number
  carPicture: string
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

interface CancelledBy {
  id: number
  fullName: string | null
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
}

interface Booking {
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
  cancelledAt: string
  cancelledById: number
  createdAt: string
  updatedAt: string
  client: Client
  car: Car
  driver: string | null // Adjust based on actual driver structure if available
  cancelledBy: CancelledBy
}

interface ConfirmBookingQueryParams {
  id: number
}
const token = cookie.load("token")
const confirmBooking = Api.injectEndpoints({
  endpoints: (build) => ({
    confirmSingleBooking: build.mutation<Booking, ConfirmBookingQueryParams>({
      query: (params) => ({
        url: `/driver-booking/status/${params.id}`,
        method: "PATCH",
        body: { totalPrice: 1000, status: "Confirmed" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["carBooking", "user"],
      transformResponse: (response: { data: Booking }) => response.data,
    }),
  }),
})

export const { useConfirmSingleBookingMutation } = confirmBooking

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = confirmBooking
