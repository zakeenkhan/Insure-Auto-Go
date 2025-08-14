"use client"
import { useGetCarsQuery } from "@/lib/features/car/car-get-api"
import { CarCard } from "../carCard"
import { SectionStarter } from "../sectionStarter"
import { useEffect, useState } from "react"
import { Car } from "@/types"

export const PopularCars = () => {
  const { data, isLoading, error } = useGetCarsQuery({
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
          {isLoading && (
            <div className="w-full text-center py-8">
              <p className="text-gray-600">Loading cars...</p>
            </div>
          )}
          {error && (
            <div className="w-full text-center py-8">
              <p className="text-red-600">Unable to load cars. Please try again later.</p>
            </div>
          )}
          {!isLoading && !error && cars.length > 0 && (
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
          {!isLoading && !error && cars.length === 0 && (
            <div className="w-full text-center py-8">
              <p className="text-gray-600">No cars available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
