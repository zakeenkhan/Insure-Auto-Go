"use client"
import React, { useEffect } from "react"
import { SectionStarter } from "../sectionStarter"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FilterCarProps {
  carTransmission: string
  city: string
  make: string
  fuelType: string
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>
  setFuelType: React.Dispatch<React.SetStateAction<string>>
  setCity: React.Dispatch<React.SetStateAction<string>>
  setMake: React.Dispatch<React.SetStateAction<string>>
  setCarTransmission: React.Dispatch<React.SetStateAction<string>>
}

export const FilterCar: React.FC<FilterCarProps> = ({
  setOpenFilter,
  setCarTransmission,
  setFuelType,
  setMake,
  setCity,
  carTransmission,
  city,
  make,
  fuelType,
}) => {
  const cities = [
    "Abbottabad",
    "Ahmedpur East",
    "Attock",
    "Bahawalnagar",
    "Bahawalpur",
    "Bhakkar",
    "Burewala",
    "Chakwal",
    "Chiniot",
    "Chishtian",
    "Dera Ghazi Khan",
    "Dera Ismail Khan",
    "Faisalabad",
    "Gujranwala",
    "Gujrat",
    "Hafizabad",
    "Hyderabad",
    "Islamabad",
    "Jacobabad",
    "Jaranwala",
    "Jhang",
    "Jhelum",
    "Karachi",
    "Kasur",
    "Khairpur",
    "Khanewal",
    "Khanpur",
    "Khushab",
    "Kot Addu",
    "Lahore",
    "Larkana",
    "Mandi Bahauddin",
    "Mansehra",
    "Mardan",
    "Mianwali",
    "Multan",
    "Murree",
    "Muzaffarabad",
    "Muzaffargarh",
    "Nankana Sahib",
    "Nawabshah",
    "Okara",
    "Peshawar",
    "Quetta",
    "Rahim Yar Khan",
    "Rawalpindi",
    "Sadiqabad",
    "Sahiwal",
    "Sargodha",
    "Sheikhupura",
    "Sialkot",
    "Sukkur",
    "Swabi",
    "Swat",
    "Tando Adam",
    "Tando Allahyar",
    "Thatta",
    "Vehari",
    "Wah Cantt",
    "Zhob",
  ]
  const handleCloseModal = () => {
    setOpenFilter(false)
  }
  const reset = () => {
    setCarTransmission("")
    setFuelType("")
    setMake("")
    setCity("")
  }
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])
  return (
    <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
      <form className="max-w-3xl bg-white py-8 px-7 rounded-lg w-full mx-auto">
        <div onClick={handleCloseModal} className="mb-5 inline-block">
          <p className="flex items-center text-xs font-normal gap-x-2 cursor-pointer">
            <img
              className="w-3 h-3"
              src="https://cdn-icons-png.flaticon.com/512/3686/3686446.png"
              alt="Back"
            />
            Back
          </p>
        </div>
        <SectionStarter title="Filter Cars" description="" />
        <div className="flex items-center justify-between gap-5 mb-5">
          {/* Company Name */}
          <div className="w-full">
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              City
            </Label>
            <div>
              <Select
                value={city ? city : ""}
                onValueChange={(value) => setCity(value)}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select a City"
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    {cities.map((city, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Model Name */}
          <div className="w-full">
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Company Name
            </Label>
            <div>
              <Select
                value={make ? make : ""}
                onValueChange={(value) => setMake(value)}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select a Company"
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="daihatsu">Daihatsu</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="hyundai">Hyundai</SelectItem>
                    <SelectItem value="kia">Kia</SelectItem>
                    <SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="volkswagen">Volkswagen</SelectItem>
                    <SelectItem value="lexus">Lexus</SelectItem>
                    <SelectItem value="mazda">Mazda</SelectItem>
                    <SelectItem value="subaru">Subaru</SelectItem>
                    <SelectItem value="mitsubishi">Mitsubishi</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="land-rover">Land Rover</SelectItem>
                    <SelectItem value="jaguar">Jaguar</SelectItem>
                    <SelectItem value="fiat">Fiat</SelectItem>
                    <SelectItem value="renault">Renault</SelectItem>
                    <SelectItem value="peugeot">Peugeot</SelectItem>
                    <SelectItem value="citroen">Citroen</SelectItem>
                    <SelectItem value="volvo">Volvo</SelectItem>
                    <SelectItem value="tesla">Tesla</SelectItem>
                    <SelectItem value="ferrari">Ferrari</SelectItem>
                    <SelectItem value="lamborghini">Lamborghini</SelectItem>
                    <SelectItem value="maserati">Maserati</SelectItem>
                    <SelectItem value="bentley">Bentley</SelectItem>
                    <SelectItem value="rolls-royce">Rolls-Royce</SelectItem>
                    <SelectItem value="aston-martin">Aston Martin</SelectItem>
                    <SelectItem value="alfa-romeo">Alfa Romeo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Car Transmission */}
          <div className="w-full">
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Transmission
            </Label>
            <div>
              <Select
                value={carTransmission ? carTransmission : ""}
                onValueChange={(value) => setCarTransmission(value)}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select transmission"
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-7 flex gap-3 justify-center">
          <Button
            onClick={() => setOpenFilter(false)}
            className="flex text-lg w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
          >
            Apply Filter
          </Button>
          <Button
            onClick={() => reset()}
            className="flex text-lg w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"black"}
            size={"md"}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}
