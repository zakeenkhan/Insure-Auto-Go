"use client"
import Image from "next/image"
import styles from "./style.module.css"
import car from "./car.png"

export const CarCard = ({
  name,
  id,
  modelYear,
  perDay,
  fuelType,
  company,
  transmissionType,
  mileAge,
  seats,
  city,
  image,
}: any) => {
  return (
    <div className={`${styles.card} bg-white rounded-lg p-3`}>
      <div className="overflow-hidden rounded-xl">
          <Image
          width={500}
          height={300}
          className="w-full h-[200px] object-cover object-center"
          src={image || car.src}
          alt={name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = car.src;
          }}
        />
      </div>
      <div className="px-3">
        <h4 className="py-4 font-bold text-xl">{name}</h4>
        <hr />
        <div className="grid grid-cols-2 gap-2 text-sm pt-3">
          <p>Year: {modelYear}</p>
          <p>Fuel: {fuelType}</p>
          <p>Company: {company}</p>
          <p>Trans: {transmissionType}</p>
          <p>Reg: {mileAge}</p>
          <p>Seats: {seats}</p>
          <p>City: {city}</p>
        </div>
        <div className="flex justify-between items-center pt-3">
          <span className="font-semibold">Rs {perDay}/day</span>
          <a className="text-[#E18B20]" href={`/rentCars/${id}`}>
            View Details
          </a>
        </div>
      </div>
    </div>
  )
}
