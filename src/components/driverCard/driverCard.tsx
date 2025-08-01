"use client"
import Image from "next/image"
import driver from "./driver.png"
import { Button } from "../ui/button"
import "./style.css"
import { useRouter } from "next/navigation"

type DriverCardProps = {
  name: string
  picture: string
  id: number
}

export const DriverCard = ({ name, picture, id }: DriverCardProps) => {
  const router = useRouter()
  const handleHireMeClick = () => {
    router.push(`/hire/${id}`)
  }
  return (
    <div>
      <div className="bg-white card cursor-pointer rounded-lg px-3 py-4">
        <div className="overflow-hidden rounded-xl">
          <Image
            width="500"
            height="500"
            className="w-full h-[300px] object-cover object-top"
            src={picture}
            alt="driver"
          />
        </div>
        <div className="px-3">
          <h4 className="py-4 font-bold text-2xl">
            {name ? name : "John Doe"}
          </h4>
          <hr />
          <div>
            <div className="flex items-center pt-3 ">
              <div className="w-1/5">
                <p className="text-sm font-bold">Contact</p>
              </div>
              <div>
                <p className="text-xs">+92 3040400400</p>
              </div>
            </div>
            <div className="flex items-center pt-3">
              <div className="w-1/5">
                <p className="text-sm font-bold">Age</p>
              </div>
              <div>
                <p className="text-xs">23 years</p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleHireMeClick}
            className="w-full mt-4 flex gap-3 items-center"
            variant={"blue"}
            size={"lg"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M13.3333 11.3342L6.66667 11.3333M5.83333 3V4.66667M14.1667 3V4.66667M5.16667 18H14.8333C15.7667 18 16.2335 18 16.59 17.8183C16.9036 17.6586 17.1586 17.4036 17.3183 17.09C17.5 16.7335 17.5 16.2667 17.5 15.3333V7.33333C17.5 6.39991 17.5 5.9332 17.3183 5.57668C17.1586 5.26307 16.9036 5.00811 16.59 4.84832C16.2335 4.66667 15.7667 4.66667 14.8333 4.66667H5.16667C4.23325 4.66667 3.76653 4.66667 3.41002 4.84832C3.09641 5.00811 2.84144 5.26307 2.68166 5.57668C2.5 5.9332 2.5 6.39991 2.5 7.33333V15.3333C2.5 16.2667 2.5 16.7335 2.68166 17.09C2.84144 17.4036 3.09641 17.6586 3.41002 17.8183C3.76653 18 4.23324 18 5.16667 18Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Hire Me
          </Button>
        </div>
      </div>
    </div>
  )
}
