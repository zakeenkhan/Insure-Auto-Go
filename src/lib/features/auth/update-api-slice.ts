import { Api } from "@/lib/api"
import cookie from "react-cookies"

interface user {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  role: string
  profilePicture: string
  cnic: string
}

type RequestPayload = {
  id: string
  fullName?: string
  profilePicture?: string
  cnic?: null
}

const updateProfile = Api.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation<user, RequestPayload>({
      query: (data) => {
        const token = cookie.load("token")

        return {
          method: "PUT",
          url: `auth/update-user-profile`,
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

export const { useUpdateProfileMutation } = updateProfile

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = updateProfile
