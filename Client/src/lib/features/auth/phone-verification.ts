import { Api } from "@/lib/api"

interface user {
  id: number
  fullName: string
  email: string
  isVerified: boolean
  role: string
  profilePicture: string
  cnic?: string
  phone: string
  dob: string
  otp: number
  averageRatingGiven: string
  ratingCount: number
  weightage: string
  cnicPhoto: string
  isSignUpVerified: boolean
  createdAt: string
  updatedAt: string
}
type PhoneAuthResponse = {
  statusCode: number
  data: {
    user: {
      id: number
      fullName: string
      email: string
      isVerified: boolean
      role: string
      profilePicture: string | null
      cnic?: string | null
      phone: string
      dob: string
      otp: number | null
      averageRatingGiven: string
      ratingCount: number
      weightage: string
      cnicPhoto: string | null
      isSignUpVerified: boolean
      createdAt: string
      updatedAt: string
    }
    accessToken: string
    message: string
  }
  error: string | null
}

type PhoneAuthPayload = {
  email: string
  otp: number
}
const phoneVerification = Api.injectEndpoints({
  endpoints: (build) => ({
    verifyPhone: build.mutation<PhoneAuthResponse, PhoneAuthPayload>({
      query: (data) => {
        return {
          method: "POST",
          url: `auth/verify-signUp`,
          body: data,
        }
      },
    }),
  }),
})

export const { useVerifyPhoneMutation } = phoneVerification

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = phoneVerification
