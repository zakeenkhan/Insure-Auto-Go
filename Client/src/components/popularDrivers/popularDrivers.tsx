"use client"
import { useGetDriversQuery } from "@/lib/features/driver/drivers-api"
import { DriverCard } from "../driverCard"
import { SectionStarter } from "../sectionStarter"
import { useEffect, useState } from "react"
import { Driver } from "@/types"

export const PopularDrivers = () => {
  const { data, isLoading } = useGetDriversQuery({
    page: 1,
    pageSize: 10,
  })
  const [drivers, setDrivers] = useState<Driver[]>([])
  useEffect(() => {
    if (!isLoading) {
      setDrivers(data?.data || [])
    }
  }, [isLoading, data])
  return (
    <div className="bg-[#F2F7F6]">
      <div className="py-8 container mx-auto">
        <SectionStarter
          title="Most Popular Drivers"
          description="Here's a list of some of the most popular Drivers globally, based on their preferences"
        />
        <div className="flex flex-wrap ">
          {drivers.length > 0 && (
            <>
              {drivers.map((driver: Driver, index: number) => (
                <div key={index} className="lg:w-1/3 md:w-1/2 sm:w-full p-3">
                  <DriverCard
                    name={driver?.user?.fullName || ""}
                    picture={driver.driverPicture}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
