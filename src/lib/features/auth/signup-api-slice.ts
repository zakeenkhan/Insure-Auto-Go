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
  statusCode: number
  user: user
  accessToken: string
}
type RequestPayload = {
  email: string
  password: string
  phone: string
  fullName: string
  cnicPhoto: string
  dob: string
}
const deviceSignup = Api.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation<AuthResponse, RequestPayload>({
      query: (data) => {
        return {
          method: "POST",
          url: `auth/signup`,
          body: data,
        }
      },
      invalidatesTags: ["user"],
    }),
  }),
})

export const { useSignupMutation } = deviceSignup

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = deviceSignup
