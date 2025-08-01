"use client"
import { useGetCarsQuery } from "@/lib/features/car/car-get-api"
import { CarCard } from "../carCard"
import { SectionStarter } from "../sectionStarter"
import { useEffect, useState } from "react"
import { Car } from "@/types"

export const PopularCars = () => {
  const { data, isLoading } = useGetCarsQuery({
    page: 1,
    pageSize: 10,
    isAvailable: true,
  })
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    if (!isLoading) {
      setCars(data?.data || [])
    }
  }, [isLoading, data])
  return (
    <div className="bg-[#F2F7F6]">
      <div className="py-8 container mx-auto">
        <SectionStarter
          title="Explore Most Popular Cars"
          description="Here's a list of some of the most popular cars globally, based on sales and customer preferences"
        />
        <div className="flex flex-wrap ">
          {cars.length > 0 && (
            <>
              {cars.map((car: Car, index: number) => (
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
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
