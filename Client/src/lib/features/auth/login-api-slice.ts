import { Api } from "@/lib/api"

interface user {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  role: string
  profilePicture: string
  cnic: string
}
type AuthResponse = {
  user: user
  accessToken: string
}
type RequestPayload = {
  email: string
  password: string
}
const deviceLogin = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, RequestPayload>({
      query: (data) => {
        return {
          method: "POST",
          url: `auth/signin`,
          body: data,
        }
      },
      invalidatesTags: ["user"],
    }),
  }),
})

export const { useLoginMutation } = deviceLogin

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = deviceLogin
