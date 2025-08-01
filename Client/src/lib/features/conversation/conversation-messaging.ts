import { Api } from "@/lib/api"
import cookie from "react-cookies"

type ConversationMessageResponse = {
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

type ConversationMessagePayload = {
  convId: string
  content: string
}
const ConversationMessage = Api.injectEndpoints({
  endpoints: (build) => ({
    MessageConversation: build.mutation<
      ConversationMessageResponse,
      ConversationMessagePayload
    >({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `conversation/message`,
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      invalidatesTags: ["messages"],
    }),
  }),
})

export const { useMessageConversationMutation } = ConversationMessage

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } =
  ConversationMessage
