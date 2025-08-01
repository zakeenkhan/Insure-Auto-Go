import { Api } from "@/lib/api"
import cookie from "react-cookies"

type DriverBookingResponse = {
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

type DriverBookingPayload = {
  driverId?: number | null
  isInsured: boolean
  insurance: string
  bookingDate: string
  startDate: string
  endDate: string
  totalPrice: number
  clientContactNo?: string
}
const hireDriver = Api.injectEndpoints({
  endpoints: (build) => ({
    driverHiring: build.mutation<DriverBookingResponse, DriverBookingPayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `driver-booking`,
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      invalidatesTags: ["carBooking"],
    }),
  }),
})

export const { useDriverHiringMutation } = hireDriver

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = hireDriver
