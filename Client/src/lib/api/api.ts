// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Get the base URL from environment variables
const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

// Initialize an empty API service that we'll inject endpoints into later as needed
export const Api = createApi({
  reducerPath: "api/public",
  // Set a default timeout of 10 seconds
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    timeout: 10000,
    prepareHeaders: (headers) => {
      // Add any default headers here
      headers.set('Content-Type', 'application/json')
      return headers
    },
    credentials: 'include', // Important for cookies/sessions
  }),
  endpoints: () => ({}),
  tagTypes: ["cars", "user", "carBooking", "messages"],
})
