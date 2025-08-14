// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// initialize an empty api service that we'll inject endpoints into later as needed
export const Api = createApi({
  reducerPath: "api/public",
  // Set a default timeout of 10 seconds
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555/",
    timeout: 10000,
    prepareHeaders: (headers) => {
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["cars", "user", "carBooking", "messages"],
})
