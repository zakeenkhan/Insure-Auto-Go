import { Api } from "@/lib/api"
import cookie from "react-cookies"
type ConversationResponse = {
  statusCode: number
  data: [
    {
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
  ]
  error: string | null
}

const Conversations = Api.injectEndpoints({
  endpoints: (build) => ({
    getConversation: build.query<ConversationResponse, void>({
      query: () => {
        const token = cookie.load("token")
        return {
          method: "GET",
          url: `conversation`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["messages"],
      transformResponse: (response: { data: ConversationResponse }) =>
        response.data,
    }),
  }),
})

export const { useGetConversationQuery } = Conversations

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = Conversations
