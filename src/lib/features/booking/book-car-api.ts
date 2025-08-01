import { Api } from "@/lib/api"
import cookie from "react-cookies"

type CarBookingResponse = {
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

type User = {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  cnic: string
  role: string
  profilePicture: string | null
}

type CarBookingPayload = {
  carId: number
  driverId?: number | null
  isInsured: boolean
  insurance: string
  bookingDate: string
  startDate: string
  endDate: string
  totalPrice: number
  clientContactNo?: string
}
const bookCar = Api.injectEndpoints({
  endpoints: (build) => ({
    carBooking: build.mutation<CarBookingResponse, CarBookingPayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `booking`,
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

export const { useCarBookingMutation } = bookCar

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = bookCar
