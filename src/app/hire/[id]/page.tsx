"use client"
import { Footer, Header, RatingStar } from "@/components"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { SingleDriver } from "@/types"
import { useForm } from "react-hook-form"
import { sendContactFormEmail } from "@/components/actions/email"
import { CreateEmailResponse } from "resend"
import { useDriverHiringMutation } from "@/lib/features/driver/hire-driver"
import { useRouter } from "next/navigation"
import { useGetSingleDriverQuery } from "@/lib/features/driver/get-single-driver"

type Props = {
  params: { id: number }
}
export const ContactFormSchema = z.object({
  name: z.string().min(1, {
    message: "First name is required",
  }),
  clientContactNo: z.string().min(1, {
    message: "First name is required",
  }),
  email: z.string().email("Please enter a valid email address"),
})

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffa128"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

export const HireDriver = ({ params }: Props) => {
  const router = useRouter()
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false)
  const [response, setResponse] = useState<CreateEmailResponse | null>(null)
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      clientContactNo: "",
      email: "",
    },
  })
  const {
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    try {
      setIsLoadingStart(true)
      const res = await sendContactFormEmail(data)

      if (!res || res instanceof Error) {
        throw new Error("Failed to submit form. Please try again!")
      }

      setResponse(res)
      form.reset()
    } catch (e) {
      // setIsError(e.message || "Failed to submit form. Please try again!")
      console.error(e, "error")
    } finally {
      setIsLoadingStart(false)
    }
  }
  const {
    data: single,
    error,
    isLoading,
  } = useGetSingleDriverQuery({
    id: params.id,
  })
  const [bookingDriver, { isLoading: isLoadingBooking }] =
    useDriverHiringMutation()
  const handleBookCar = async () => {
    await bookingDriver({
      driverId: Number(params.id),
      isInsured: false,
      insurance: "insured",
      bookingDate: new Date().toISOString(),
      startDate: selectedDate?.toISOString() || "",
      endDate: dropDate?.toISOString() || "",
      totalPrice: driver?.per12HoursRate || 3000,
      clientContactNo: driver?.user.phone || "03333388080",
    }).then((res) => {
      res.data && router.push("/hiring")
      console.log(res, "booking res")
    })
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [driver, setDriver] = useState<SingleDriver | undefined>()
  const [dropDate, setDropDate] = useState<Date | null>(null)
  const [contactNumber, setContactNumber] = useState<string | null>(null)
  useEffect(() => {
    if (!isLoading) {
      setDriver(single as SingleDriver)
    }
  }, [isLoading])
  const handlePickDate = (day: Date | undefined) => {
    setSelectedDate(day || null)
  }

  const handleDropDate = (day: Date | undefined) => {
    setDropDate(day || null)
  }
const handleSendMessage = () => {
  router.push(`/messages/${driver?.userId}`)
}
  return (
    <>
      <Header />
      <div className="flex justify-between w-8/12 min-h-full gap-x-12 mt-40 mb-10 mx-auto">
        <div key={driver?.id} className="w-3/5 shadow-xl rounded-xl">
          <div className="rounded-xl shadow-md">
            <div>
              {driver?.driverPicture && (
                <Image
                  width="500"
                  height="500"
                  className="w-full h-[20rem] rounded-t-xl"
                  src={driver?.driverPicture}
                  alt="cars"
                />
              )}
            </div>
            <div className="border-x border-b border-gray-400 rounded-b-xl p-8">
              <div className="border-b flex items-center justify-between border-gray-300 py-5">
                <p className="text-black text-xl">Name</p>
                <h2 className="text-lg text-gray-900 dark:text-white font-bold mb-3">
                  {driver?.user?.fullName
                    ? driver?.user?.fullName
                    : "Acura Sport Version"}
                </h2>
              </div>
              <div className="border-b flex items-center justify-between border-gray-300 py-5">
                <p className="text-black text-xl">Pay Per Day</p>
                <p className="text-lg font-semibold text-[#E18B20]">
                  {driver?.per12HoursRate}{" "}
                  <span className="text-gray-600 dark:text-white">/ Day</span>
                </p>
              </div>
              {driver?.user?.dob !== null && (
                <div className="border-b flex items-center justify-between border-gray-300 py-5">
                  <p className="text-black text-xl">Age</p>
                  <p className="text-lg font-semibold text-[#E18B20]">
                    {driver?.user.dob}{" "}
                    <span className="text-gray-600 dark:text-white">years</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-2/5 rounded-xl h-full">
          <div className="bg-[#E18B20] px-6 py-8 rounded-t-xl">
            <h2 className="text-white font-medium text-xl">Hire Form</h2>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full bg-slate-200 px-6 py-10 rounded-b-xl shadow-md"
          >
            <div className="flex mb-8 justify-between items-center gap-x-7">
              <div className="w-full">
                <Label
                  htmlFor="PickupDate"
                  className="block mb-4 text-base font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={selectedDate ? format(selectedDate, "PPP") : ""}
                        placeholder="Select Date"
                        readOnly
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white p-4 rounded-lg shadow-lg z-50">
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={handlePickDate}
                      // className="text-black"
                      modifiersClassNames={{
                        selected: "bg-[#E18B20] text-white",
                        today: "text-[#E18B20]",
                      }}
                      disabled={(date) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return date < today
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="w-full">
              <Label
                htmlFor="DropoffDate"
                className="block mb-4 text-base font-medium text-gray-900 dark:text-white"
              >
                End Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      value={dropDate ? format(dropDate, "PPP") : ""}
                      placeholder="Select Date"
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full px-3 py-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="bg-white p-4 rounded-lg shadow-lg z-50">
                  <Calendar
                    mode="single"
                    selected={dropDate || undefined}
                    onSelect={handleDropDate}
                    className="text-black"
                    modifiersClassNames={{
                      selected: "bg-[#E18B20] text-white",
                      today: "text-[#E18B20]",
                    }}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={() => handleBookCar()}
              type="submit"
              className="flex text-lg w-full py-6 px-8 mt-8 font-semibold gap-2 stroke-white hover:stroke-[#E18B20]"
              variant={"orange"}
            >
              {isLoadingStart ? "Loading..." : " Book Now"}
            </Button>
          </form>
          <div>
            <Button
            onClick={() => handleSendMessage()}
              className="flex text-lg w-full py-6 px-8 mt-8 font-semibold gap-2 stroke-white hover:stroke-[#E18B20]"
              variant={"orange"}
            >
              Message Me
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HireDriver
