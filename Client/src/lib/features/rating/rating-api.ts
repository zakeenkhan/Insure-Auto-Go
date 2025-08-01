import { Api } from "@/lib/api"
import cookie from "react-cookies"

type RatingResponse = {
  bookingId: number
  rating: string
  review: string
}
type RatingPayload = {
  bookingId: number
  rating: number
  review: string
}
const Rating = Api.injectEndpoints({
  endpoints: (build) => ({
    rating: build.mutation<RatingResponse, RatingPayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `rating`,
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

export const { useRatingMutation } = Rating

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = Rating
