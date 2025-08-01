"use client"
import { Footer, Header, RatingStar } from "@/components"
import { useEffect, useState } from "react"
import {
  AllDriverBooking,
  Booking as BookingsResponse,
  Booking as CarBooking,
} from "@/types"
import { Button } from "@/components/ui/button"
import { useGetMeQuery } from "@/lib/features/user/me-api"
import { useAllBookingsQuery } from "@/lib/features/driver/all-driver-booking"
import Image from "next/image"
import underline from "./underline.png"
import { useCancelSingleBookingMutation } from "@/lib/features/driver/cancel-booking"
import { useConfirmSingleBookingMutation } from "@/lib/features/driver/confirm-booking"
import { format } from "date-fns"
import { useCompleteSingleBookingMutation } from "@/lib/features/driver/complete-booking"
import { useRatingMutation } from "@/lib/features/rating/rating-api"

export default function Hiring() {
  // cancel booking
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelSingleBookingMutation()

  // confirm booking
  const [confirmBooking, { isLoading: confirmLoading }] =
    useConfirmSingleBookingMutation()
  // complete booking
  const [completeBooking, { isLoading: completingLoading }] =
    useCompleteSingleBookingMutation()
  // bookings
  const [bookings, setBookings] = useState<AllDriverBooking[]>([])
  const [allBookingsData, setAllBookingsData] = useState<AllDriverBooking[]>([])
  const [myBookingData, setMyBookingData] = useState<AllDriverBooking[]>([])
  // rating
  const [rating, setRating] = useState(1)
  const [ratingPopup, setRatingPopup] = useState(false)
  const [bookingId, setBookingID] = useState<number>()
  const [reviewMessage, setReviewMessage] = useState<string>()
  const [ratingPost, { isLoading: ratingLoading }] = useRatingMutation()
  // rating-end
  const { data: user, error, isLoading } = useGetMeQuery()
  const {
    data: allBookings,
    error: bookingError,
    isLoading: bookingLoading,
  } = useAllBookingsQuery({
    page: 1,
    pageSize: 100,
  })

  useEffect(() => {
    if (!isLoading) {
      const BookingRequest = allBookingsData?.filter(
        (booking: AllDriverBooking) => {
          return booking.client.id === user?.id
        }
      )
      console.log(BookingRequest, "BookingRequest")
      setBookings(BookingRequest as AllDriverBooking[])
    }
    if (!bookingLoading) {
      setAllBookingsData(allBookings?.data as AllDriverBooking[])
    }

    const myCarBooking = allBookingsData?.filter(
      (booking: AllDriverBooking) => {
        return booking.driver.user.id === user?.id
      }
    )
    setMyBookingData(myCarBooking)
  }, [isLoading, user, bookingLoading, allBookings, allBookingsData])
  if (error)
    return (
      <p className="h-screen w-vw flex justify-center items-center">
        You are not authorized
      </p>
    )
  if (isLoading)
    return (
      <p className="h-screen w-vw flex justify-center items-center">
        Loading....
      </p>
    )
  return (
    <>
      <Header />
      {bookings.length <= 0 && myBookingData.length <= 0 && (
        <p className="h-screen w-vw flex justify-center items-center">
          No Bookings Found
        </p>
      )}
      {bookings.length > 0 && (
        <>
          <div className="container mx-auto mb-10 mt-28">
            <h2 className="text-center text-2xl font-bold">
              My Driver Booking Requests
            </h2>
            <div className="flex pt-2 justify-center">
              <Image width={50} src={underline} alt="line" />
            </div>
          </div>
          <div className="flex flex-wrap  container mx-auto w-full">
            {bookings.length > 0 &&
              bookings.map((CarBooking, index) => (
                <div
                  key={index}
                  className="lg:w-1/3 md:w-1/2 px-3 my-3 rounded-xl sm:w-full"
                >
                  <div className="w-full border shadow-xl rounded-t-xl">
                    <div className="w-full text-center rounded-t-xl py-3 bg-[#E18B20]">
                      <p className="text-white">Car Information</p>
                    </div>
                    <div className="px-3">
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Driver:</p>
                        <p>{CarBooking.driver.user.fullName}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Location:</p>
                        <p>{CarBooking.driver.city}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Rent Per Day:</p>
                        <p>{CarBooking.driver.per12HoursRate}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Booking Date:</p>
                        <p>{format(CarBooking.bookingDate, "PPP")}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Booking From:</p>
                        <p>{format(CarBooking.startDate, "PPP")}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Booking End:</p>
                        <p>{format(CarBooking.endDate, "PPP")}</p>
                      </div>
                      <div className=" flex justify-between py-2 ">
                        <p className="font-bold">Booking Status:</p>
                        <p
                          className={` ${
                            CarBooking.status === "Cancelled" && "text-red-500"
                          } ${
                            CarBooking.status === "Completed" &&
                            "text-green-500"
                          }
                          ${
                            CarBooking.status === "Confirmed" && "text-blue-500"
                          }`}
                        >
                          {CarBooking.status}
                        </p>
                      </div>
                    </div>
                    {CarBooking.status === "Pending" && (
                      <div className="py-3 px-3">
                        <Button
                          onClick={() => cancelBooking({ id: CarBooking.id })}
                          className="w-full"
                          variant="black"
                          disabled={cancelLoading}
                        >
                          {cancelLoading ? "Cancelling..." : "Cancel"}
                        </Button>
                      </div>
                    )}
                    {CarBooking.status === "Confirmed" && (
                      <div className="py-3 px-3 flex gap-3">
                        <Button
                          onClick={() => {
                            completeBooking({ id: CarBooking.id })
                            setBookingID(CarBooking.id)
                          }}
                          className="w-full"
                          variant="green"
                          disabled={completingLoading}
                        >
                          {completingLoading
                            ? "Completing..."
                            : "Mark as Completed"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {/* {cars.map((car: Car, index: number) => (
        <div key={index} className="lg:w-1/3 md:w-1/2 sm:w-full p-3">
          <CarCard
            name={car.name}
            id={car.id}
            modelYear={car.makeYear}
            perDay={car?.rentPerDay}
            fuelType={car.fuelType}
            company={car.Make}
            steering={"right"}
            transmissionType={car.carTransmission}
            mileAge={car.registrationNo}
            seats={car.capacity}
            city={car.city}
            image={car.carPicture}
          />
        </div>
      ))} */}
          </div>
        </>
      )}
      {myBookingData.length > 0 && (
        <>
          <div className="container mx-auto mb-10 mt-28">
            <h2 className="text-center text-2xl font-bold">
              Your Hiring Requests
            </h2>
            <div className="flex pt-2 justify-center">
              <Image width={50} src={underline} alt="line" />
            </div>
          </div>
          <div className="flex flex-wrap mb-10 container mx-auto w-full">
            {myBookingData.length > 0 &&
              myBookingData.map((CarBooking, index) => (
                <div
                  key={index}
                  className="lg:w-1/3 md:w-1/2 px-3 my-3  rounded-xl sm:w-full"
                >
                  <div className="w-full border shadow-xl rounded-t-xl">
                    <div className="w-full text-center rounded-t-xl py-3 bg-[#E18B20]">
                      <p className="text-white">Booking Information</p>
                    </div>
                    <div className="px-3">
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Client Name:</p>
                        <p>{CarBooking.client.fullName}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Client Email:</p>
                        <p>{CarBooking.client.email}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Client Number:</p>
                        <p>{CarBooking?.clientContactNo}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Booking Date:</p>
                        <p>{format(CarBooking.bookingDate, "PPP")}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Booking From:</p>
                        <p>{format(CarBooking.startDate, "PPP")}</p>
                      </div>
                      <div className="border-b flex justify-between py-2">
                        <p className="font-bold">Booking End:</p>
                        <p>{format(CarBooking.endDate, "PPP")}</p>
                      </div>
                      <div className="flex justify-between py-2">
                        <p className="font-bold">Booking Status:</p>
                        <p
                          className={` ${
                            CarBooking.status === "Cancelled" && "text-red-500"
                          } ${
                            CarBooking.status === "Completed" &&
                            "text-green-500"
                          }
                          ${
                            CarBooking.status === "Confirmed" && "text-blue-500"
                          }`}
                        >
                          {CarBooking.status}
                        </p>
                      </div>
                    </div>
                    {CarBooking.status === "Pending" && (
                      <div className="py-3 px-3 flex gap-3">
                        <Button
                          onClick={() => cancelBooking({ id: CarBooking.id })}
                          className="w-full"
                          variant="black"
                          disabled={cancelLoading}
                        >
                          {cancelLoading ? "Cancelling..." : "Cancel"}
                        </Button>
                        <Button
                          onClick={() => confirmBooking({ id: CarBooking.id })}
                          className="w-full"
                          variant="orange"
                          disabled={confirmLoading}
                        >
                          {confirmLoading ? "Confirming..." : " Accept Request"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
      {ratingPopup && (
        <div className="fixed inset-0 z-50">
          <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
            <div className="max-w-xl bg-white h-[50vh] p-3  rounded-lg w-full mx-auto">
              <div className="flex w-full justify-end">
                <button
                  onClick={() => setRatingPopup(false)}
                  className="text-black text-xl"
                >
                  X
                </button>
              </div>
              <div className="py-3 px-7">
                <p className="pt-4 text-xl text-center">Rate this car</p>
                <div>
                  <RatingStar setCarRating={setRating} ratings={rating} />
                  <p className="py-3 font-bold">Review</p>
                  <textarea
                    onChange={(e) => setReviewMessage(e.target.value)}
                    rows={3}
                    placeholder="Type your review"
                    className="w-full outline-none"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={() =>
                      ratingPost({
                        bookingId: bookingId || 0,
                        rating: rating,
                        review: reviewMessage || "",
                      })
                        .then((res) => {
                          res.data && setRatingPopup(false)
                        })
                        .catch((e) => {
                          console.log(e)
                        })
                    }
                    className="hover:stroke-black stroke-white flex gap-2 items-center"
                    variant={"black"}
                    size={"lg"}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
