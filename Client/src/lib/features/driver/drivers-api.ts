import { Api } from "@/lib/api"
import cookie from "react-cookies"

interface ratings {
  rating: number
  review: string
}
interface Drivers {
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
  ratings: ratings[]
}

interface DriversResponse {
  data: Drivers[]
  meta: {
    totalPages: number
    totalRecords: number
    currentPage: number
  }
}

interface DriversQueryParams {
  search?: string
  page?: number
  pageSize?: number
}
const token = cookie.load("token")
const DriversApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getDrivers: build.query<DriversResponse, DriversQueryParams>({
      query: (params) => ({
        url: "/driver",
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
      transformResponse: (response: { data: DriversResponse }) => response.data,
    }),
  }),
})

export const { useGetDriversQuery } = DriversApi

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = DriversApi
