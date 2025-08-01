import { Api } from "@/lib/api"
import cookie from "react-cookies"

type MessageResponse = {
  userId: number
  driverId: number
  createdAt: string
  updatedAt: string
}
type MessagePayload = {
  driverId: number
}
const Message = Api.injectEndpoints({
  endpoints: (build) => ({
    sentMessage: build.mutation<MessageResponse, MessagePayload>({
      query: (data) => {
        const token = cookie.load("token")
        return {
          method: "POST",
          url: `conversation`,
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

export const { useSentMessageMutation } = Message

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = Message
