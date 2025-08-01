import { Api } from "@/lib/api"
import cookie from "react-cookies"

type CreateDriverResponse = {
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
  user: {
    id: number
    fullName: string
    email: string
    profilePicture: string
    isVerified: boolean
  }
}
type CreateDriverPayload = {
  licenseNo: string
  licenseExpiry: string
  licensePicture: string
  lisenceType: string
  driverPicture: string
  city: string
  per12HoursRate: number
}
const createDriver = Api.injectEndpoints({
  endpoints: (build) => ({
    driver: build.mutation<CreateDriverResponse, CreateDriverPayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `driver`,
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      invalidatesTags: ["user"],
    }),
  }),
})

export const { useDriverMutation } = createDriver

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = createDriver
