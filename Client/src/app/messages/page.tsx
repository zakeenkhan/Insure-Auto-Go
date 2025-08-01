"use client"
import { Header } from "@/components"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetConversationQuery } from "@/lib/features/conversation/get-conversation"
import { useGetMeQuery } from "@/lib/features/user/me-api"
import { useGetSingleConversationQuery } from "@/lib/features/conversation/get-conversation-with-id"
import { Conversation } from "@/types"
import { useMessageConversationMutation } from "@/lib/features/conversation/conversation-messaging"

export default function Messages() {
  const messageContainerRef = useRef<HTMLDivElement | null>(null)
  // get all conversations
  const {
    data: conversations,
    error: conversationsError,
    isLoading: conversationsLoading,
  } = useGetConversationQuery()
  // get me user
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useGetMeQuery()
  // get Single Conversation
  const [selectedConversationId, setSelectedConversationId] =
    useState<string>("")
  const { data, isLoading, error, refetch } = useGetSingleConversationQuery({
    id: selectedConversationId,
  })
  // sent Single Message
  const [message, setMessage] = useState<string>("")
  const [messageConversation, { isLoading: messageLoading }] =
    useMessageConversationMutation()
  useEffect(() => {
    if (!userLoading && !conversationsLoading) {
      const myConversations = conversations?.filter(
        (conversation: Conversation) => conversation.userId === user?.id
      )
    }
  }, [conversationsLoading, user, userLoading, conversations])
  const handleConversationClick = (userId: number, driverId: number) => {
    // Set the selected conversation and trigger the query
    setSelectedConversationId(`${userId}-${driverId}`)
    if (selectedConversationId === `${userId}-${driverId}`) {
      refetch()
    }
  }
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      refetch()
    }, 3000)

    //Clearing the interval
    return () => clearInterval(interval)
  }, [])
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
      if (elementRef.current) {
        elementRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, [data]) // Add data.messages as a dependency
    return <div ref={elementRef} />
  }
  if (conversationsError)
    return (
      <p className="h-screen w-vw flex justify-center items-center">
        You are not authorized
      </p>
    )
  if (conversationsLoading)
    return (
      <p className="h-screen w-vw flex justify-center items-center">
        Loading....
      </p>
    )

  return (
    <>
      <Header />
      <div className="flex flex-wrap  mt-28 w-full">
        <div className="h-[83vh] flex w-full">
          <div className="w-[20%]  border-r border-black">
            {conversations?.map((conversation: Conversation, index: number) => (
              <div
                onClick={() =>
                  handleConversationClick(
                    conversation.userId,
                    conversation.driverId
                  )
                }
                key={index}
                className={`${
                  data?.driverId === conversation.driverId &&
                  data?.userId === conversation.userId
                    ? "bg-blue-400 text-white"
                    : "bg-gray-200"
                } p-4 shadow-sm mb-3 flex gap-2 items-center  m-2 rounded-lg hover:opacity-80 cursor-pointer`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-bold">
                  {conversation.userId === user?.id
                    ? conversation?.driver.fullName
                    : conversation?.user.fullName}
                </p>
              </div>
            ))}
          </div>
          {data?.messages && (
            <div className="w-[80%]">
              <div
                ref={messageContainerRef}
                className="h-[90%] overflow-y-scroll px-6"
              >
                {data?.messages?.map((message, index: number) => (
                  <div
                    key={index}
                    className={`flex m-3 ${
                      message.senderId === user?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={` shadow-lg px-5 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? "bg-blue-400 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  messageConversation({
                    convId: selectedConversationId,
                    content: message,
                  })
                  setMessage("")
                  e.preventDefault()
                }}
                action=""
              >
                <div className="h-[10%] w-full flex gap-2 px-2 pb-2">
                  <input
                    className="w-[90%] rounded-lg"
                    type="text"
                    placeholder="Type here"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                  <Button
                    type="submit"
                    className="hover:stroke-black stroke-white flex gap-2 items-center"
                    variant={"black"}
                    size={"lg"}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
