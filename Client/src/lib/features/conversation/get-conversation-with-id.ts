import { Api } from "@/lib/api"
import cookie from "react-cookies"

interface Conversation {
  userId: number
  driverId: number
  createdAt: string
  updatedAt: string
  messages: [
    {
      id: number
      senderId: number
      receiverId: number
      userId: number
      driverId: number
      isSeen: boolean
      content: string
      createdAt: string
      updatedAt: string
      sender: {
        id: number
        fullName: string
        email: string
        isVerified: boolean
        cnic: string
        role: string
        profilePicture: string | null
        dob: string | null
        phone: string | null
      }
      receiver: {
        id: number
        fullName: string
        email: string
        isVerified: boolean
        cnic: string
        role: string
        profilePicture: string | null
        dob: string | null
        phone: string | null
      }
    }
  ]
  user: {
    id: number
    fullName: string
    email: string
    isVerified: boolean
    cnic: string
    role: string
    profilePicture: string | null
    dob: string | null
    phone: string | null
  }
  driver: {
    id: number
    fullName: string
    email: string
    isVerified: boolean
    cnic: string
    role: string
    profilePicture: string | null
    dob: string | null
    phone: string | null
  }
}

interface ConversationResponse {
  data: Conversation
}

interface ConversationQueryParams {
  id: string
}
const token = cookie.load("token")
const getSingleConversation = Api.injectEndpoints({
  endpoints: (build) => ({
    getSingleConversation: build.query<
      ConversationResponse,
      ConversationQueryParams
    >({
      query: (params) => ({
        url: `conversation/${params.id}`,
        method: "GET",
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["messages"],
      transformResponse: (response: { data: ConversationResponse }) =>
        response.data,
    }),
  }),
})

export const { useGetSingleConversationQuery } = getSingleConversation

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } =
  getSingleConversation
