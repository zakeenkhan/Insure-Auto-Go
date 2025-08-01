"use client"
import { Footer, Header } from "@/components"
import { CarCard } from "@/components/carCard"
import { FilterCar } from "@/components/filterCar"
import { useEffect, useState } from "react"
import { useGetCarsQuery } from "@/lib/features/car/car-get-api"
import { Car } from "@/types"

export default function Cars() {
  const [carTransmission, setCarTransmission] = useState<string>("")
  const [fuelType, setFuelType] = useState<string>("")
  const [make, setMake] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const { data, error, isLoading } = useGetCarsQuery(
    {
      page: 1,
      pageSize: 100,
      carTransmission: carTransmission !== "" ? carTransmission : undefined,
      fuelType: fuelType !== "" ? fuelType : undefined,
      make: make !== "" ? make : undefined,
      city: city !== "" ? city : undefined,
      isAvailable: true,
    },
    {
      // @ts-ignore
      enabled: Boolean(carTransmission || fuelType || make || city),
    }
  )
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    if (!isLoading) {
      setCars(data?.data || [])
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
      <div className="flex justify-end items-center mt-28 px-8">
        <div
          onClick={() => setOpenFilter(true)}
          className="inline-block cursor-pointer"
        >
          <span className="flex items-center gap-x-2 text-lg font-medium text-gray-900 dark:text-white">
            Filter
            <svg
              className=""
              xmlns="http://www.w3.org/2000/svg"
              fill="#828282"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path
                    d="M8.959,0v81.89l201.666,201.666V512l90.75-60.5V283.556L503.041,81.89V0H8.959z M271.125,435.31l-30.25,20.167V292.416
                  h30.25V435.31z M279.985,262.166h-47.969L60.6,90.75h390.802L279.985,262.166z M472.791,60.5H39.209V30.25h433.582V60.5z"
                  />
                </g>
              </g>
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap mt-2 w-full">
        {cars.length > 0 ? (
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
        ) : (
          <div className="w-full flex items-center text-center h-[30vh]">
            <p className="w-full text-center">No cars found</p>
          </div>
        )}
      </div>
      {openFilter && (
        <div className="fixed inset-0 z-50">
          <FilterCar
            carTransmission={carTransmission}
            city={city}
            make={make}
            fuelType={fuelType}
            setFuelType={setFuelType}
            setCarTransmission={setCarTransmission}
            setOpenFilter={setOpenFilter}
            setMake={setMake}
            setCity={setCity}
          />
        </div>
      )}
      <Footer />
    </>
  )
}
