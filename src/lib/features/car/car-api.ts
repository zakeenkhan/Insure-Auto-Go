import { Api } from "@/lib/api"
import cookie from "react-cookies"

type CarResponse = {
  name: string
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
  ratings: [
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
type CarPayload = {
  name: string
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
}
const carPost = Api.injectEndpoints({
  endpoints: (build) => ({
    car: build.mutation<CarResponse, CarPayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `car`,
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      invalidatesTags: ["cars"],
    }),
  }),
})

export const { useCarMutation } = carPost

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = carPost
