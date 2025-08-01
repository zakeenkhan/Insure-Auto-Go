import { Api } from "@/lib/api"
import cookie from "react-cookies"

interface Driver {
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

interface DriverQueryParams {
  id: number
}
const token = cookie.load("token")
const driverSingleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getSingleDriver: build.query<Driver, DriverQueryParams>({
      query: (params) => ({
        url: `driver/${params.id}`,
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: { data: Driver }) => response.data,
    }),
  }),
})

export const { useGetSingleDriverQuery } = driverSingleApi

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = driverSingleApi
