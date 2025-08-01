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

interface CarResponse {
  data: Car[]
  meta: {
    totalPages: number
    totalRecords: number
    currentPage: number
  }
}

interface CarQueryParams {
  search?: string
  ownerId?: number
  carTransmission?: string
  fuelType?: string
  isAvailable?: boolean
  make?: string
  city?: string
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}
const token = cookie.load("token")
const carApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query<CarResponse, CarQueryParams>({
      query: (params) => ({
        url: "/car",
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["cars", "user"],
      transformResponse: (response: { data: CarResponse }) => response.data,
    }),
  }),
})

export const { useGetCarsQuery } = carApi

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = carApi
