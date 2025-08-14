"use client"
import { DriverCard, Footer, Header } from "@/components"
import { useEffect, useState } from "react"
import { Driver } from "@/types"
import { useGetDriversQuery } from "@/lib/features/driver/drivers-api"

export default function Drivers() {
  const { data, error, isLoading } = useGetDriversQuery({
    page: 1,
    pageSize: 100,
  })
  const [drivers, setDrivers] = useState<Driver[]>([])
  useEffect(() => {
    if (!isLoading) {
      setDrivers(data?.data || [])
    }
  }, [isLoading, data])

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
      <div className="flex flex-wrap  mt-28 w-full">
        {drivers.length > 0 ? (
          <>
            {drivers?.map((driver: Driver, index: number) => (
              <div key={index} className="lg:w-1/3 md:w-1/2 sm:w-full p-3">
                <DriverCard
                  name={driver?.user?.fullName || ""}
                  picture={driver.driverPicture}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="w-full flex items-center text-center h-[30vh]">
            <p className="w-full text-center">No cars found</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
