import { Api } from "@/lib/api"
import cookie from "react-cookies"

interface Car {
  id: number
  name: string
  carPicture: string
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

interface Car {
  data: Car
  meta: {
    totalPages: number
    totalRecords: number
    currentPage: number
  }
}

interface CarQueryParams {
  id: number
}
const token = cookie.load("token")
const carSingleApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getSingleCar: build.query<Car, CarQueryParams>({
      query: (params) => ({
        url: `/car/${params.id}`,
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: { data: Car }) => response.data,
    }),
  }),
})

export const { useGetSingleCarQuery } = carSingleApi

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = carSingleApi
