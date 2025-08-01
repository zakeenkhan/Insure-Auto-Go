"use client"
import { useEffect, useRef, useState } from "react"
import { SectionStarter } from "../sectionStarter"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { useCarMutation } from "@/lib/features/car/car-api"
import { useS3photUploadMutation } from "@/lib/features/s3photo/s3photo-api"

type CarValues = {
  name: string
  carPicture: string
  carPublished: string
  city: string
  registrationNo: string
  type: string
  makeYear: string
  capacity: number
  Make: string
  fuelType: string
  insured: boolean
  rentPerDay: number
  insuranceRequired: boolean
  carTransmission: string
}
interface CarRentalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSuccessPopup: React.Dispatch<React.SetStateAction<boolean>>
  onCarSelect: React.Dispatch<React.SetStateAction<boolean>>
}

export const CarRental: React.FC<CarRentalProps> = ({
  setOpen,
  setSuccessPopup,
}) => {
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CarValues>({
    defaultValues: {
      insuranceRequired: false,
      insured: false,
    },
  })
  const [carPost, isLoading] = useCarMutation()
  const [s3Photo] = useS3photUploadMutation()
  const onSubmit: SubmitHandler<CarValues> = (data: CarValues) => {
    carPost(data)
      .unwrap()
      .then((res) => {
        console.log(res, "carResponse")
        res && setOpen(false)
        res && setSuccessPopup(true)
      })
      .catch((e) => {
        setError(e.data.error.message)
      })
    isLoading.isSuccess && setOpen(false)
  }
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

  const [carPhotos, setCarPhotos] = useState<File[]>([])
  const [carPhoto, setCarPhoto] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [carDocuments, setCarDocuments] = useState<File[]>([])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCarPhotos([...carPhotos, ...Array.from(event.target.files)])
    }
  }
  const handleS3PhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append("file", file)

      // Ensure the file is not null or undefined
      if (file) {
        await s3Photo(formData) // Send the file directly
          .unwrap()
          .then((res) => {
            setValue(
              "carPicture",
              (res as any)?.data?.url ? (res as any).data.url : ""
            )
          })
          .catch((error) => console.error("Error uploading to S3:", error))

        setCarPhoto(file)
      }
    } else {
      console.log("No file selected.")
    }
  }
  useEffect(() => {
    handleS3PhotoUpload
  }, [carPhoto])
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCarDocuments([...carDocuments, ...Array.from(event.target.files)])
    }
  }

  const removePhoto = (photo: any) => {
    setCarPhoto(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the file input to allow re-selection of the same file
    }
  }

  const removeDocument = (index: number) => {
    setCarDocuments(carDocuments.filter((_, i) => i !== index))
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl bg-white h-[90vh] overflow-y-auto py-6 px-7 rounded-lg w-full mx-auto"
      >
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
        <SectionStarter title="Car Rental Post" description="" />
        <div>
          {carPhotos.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap mt-2">
                {carPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`car-photo-${index}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <Button
                      type="button"
                      className="absolute top-0 bg-red-500 right-0 text-white h-5 w-3 rounded-full"
                      onClick={() => removePhoto(photo)}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {carPhoto && (
            <div className="mb-4">
              <div className="flex justify-center gap-2 flex-wrap mt-2">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(carPhoto)}
                    alt={`car-photo`}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <Button
                    type="button"
                    className="absolute top-0 bg-red-500 right-0 text-white h-5 w-3 rounded-full"
                    onClick={() => removePhoto(carPhoto)}
                  >
                    &times;
                  </Button>
                </div>
              </div>
            </div>
          )}
          {carDocuments.length > 0 && (
            <div className="mb-4">
              <ul className="list-disc list-inside">
                {carDocuments.map((doc, index) => (
                  <li key={index} className="relative">
                    {doc.name}
                    <Button
                      type="button"
                      className="ml-2 bg-red-500 text-white rounded-full h-5 w-3"
                      onClick={() => removeDocument(index)}
                    >
                      &times;
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="my-5 mx-10  gap-x-10 items-center">
          <Button
            type="button"
            className="flex text-sm font-normal w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
            onClick={() => document.getElementById("carPhotoInput")?.click()}
          >
            Upload Car Photo
          </Button>
          {errors.carPicture && (
            <p
              className="text-red-500 text-center py-2 w-full text-xs"
              role="alert"
            >
              {errors.carPicture?.message}
            </p>
          )}
          {/* <Button
            type="button"
            className="flex text-sm font-normal w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
            onClick={() => document.getElementById("carDocumentInput")?.click()}
          >
            Upload Car Document
          </Button> */}
        </div>
        <div>
          <Input
            {...register("carPicture", { required: "picture is required" })}
            type="file"
            id="carPhotoInput"
            className="hidden"
            ref={fileInputRef}
            onChange={handleS3PhotoUpload}
            accept="image/*"
          />

          <Input
            type="file"
            id="carDocumentInput"
            className="hidden"
            multiple
            onChange={handleDocumentUpload}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mb-5">
          {/* Car Name */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Name
            </Label>
            <div>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Enter Car Name"
              />
            </div>
          </div>
          {/* Registration Number */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Registration Number
            </Label>
            <div>
              <input
                {...register("registrationNo", { required: true })}
                type="text"
                maxLength={7}
                id="registration"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Enter Car Registration Number"
              />
            </div>
          </div>
          {/* Make Year */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Make Year
            </Label>
            <div>
              <input
                {...register("makeYear", { required: true })}
                type="text"
                 maxLength={4}
                id="makeYear"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Enter Car Make Year"
              />
            </div>
          </div>
          {/* Location */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              City
            </Label>
            <div>
              <Select onValueChange={(value) => setValue("city", value)}>
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select City"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="w-full"
                >
                  <SelectGroup>
                    {cities.map((city, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.city && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.city?.message}
                </p>
              )}
            </div>
          </div>
          {/* Car Type */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Type
            </Label>
            <div>
              <Select onValueChange={(value) => setValue("type", value)}>
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select a car type"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("type", { required: "Car type is required" })}
                  className="w-full"
                >
                  <SelectGroup>
                    <SelectItem value="Crossover">Crossover</SelectItem>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Convertible">Convertible</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="Pickup truck">Pickup</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.type?.message}
                </p>
              )}
            </div>
          </div>
          {/* Seating Capacity */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Seating Capacity
            </Label>
            <div>
              <Select
                onValueChange={(value: string) =>
                  setValue("capacity", Number(value))
                }
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select Seating capacity"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("capacity", {
                    required: "Capacity is required",
                  })}
                  className="w-full"
                >
                  <SelectGroup>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.capacity && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.capacity?.message}
                </p>
              )}
            </div>
          </div>
          {/* Car Make year */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Manufactured by
            </Label>
            <div>
              <Select
                onValueChange={(value: string) => setValue("Make", value)}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select Company"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("Make", {
                    required: "Car Make is required",
                  })}
                  className="w-full"
                >
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
              {errors.Make && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.Make?.message}
                </p>
              )}
            </div>
          </div>
          {/* Car Fuel Type */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Fuel Type
            </Label>
            <div>
              <Select onValueChange={(value) => setValue("fuelType", value)}>
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select Fuel Type"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("fuelType", {
                    required: "Fuel type is required",
                  })}
                  className="w-full"
                >
                  <SelectGroup>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.fuelType && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.fuelType?.message}
                </p>
              )}
            </div>
          </div>
          {/* Car Transmission */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Transmission
            </Label>
            <div>
              <Select
                onValueChange={(value) => setValue("carTransmission", value)}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select Transmission Type"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("carTransmission", {
                    required: "Transmission is required",
                  })}
                  className="w-full"
                >
                  <SelectGroup>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.carTransmission && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.carTransmission?.message}
                </p>
              )}
            </div>
          </div>
          {/* Price */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Per Day Rent
            </Label>
            <div>
              <input
                onChange={(e) => setValue("rentPerDay", Number(e.target.value))}
                type="number"
                id="rentPerDay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="4000"
              />
            </div>
          </div>
          {/* Car Insured */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              Car Insured
            </Label>
            <div>
              <Select
                onValueChange={(value) =>
                  setValue(
                    "insured",
                    value.toString() === "insured" ? true : false
                  )
                }
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select Insurance Status"
                  />
                </SelectTrigger>
                <SelectContent {...register("insured")} className="w-full">
                  <SelectGroup>
                    <SelectItem value="insured">Insured</SelectItem>
                    <SelectItem value="not-insured">Not Insured</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.insured && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.insured?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Car Insured */}
        <div>
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Insured required for giving rental
          </Label>
          <div>
            <Select
              onValueChange={(value) =>
                setValue(
                  "insuranceRequired",
                  value.toString() === "required" ? true : false
                )
              }
            >
              <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <SelectValue
                  className="text-gray-400 text-xs"
                  placeholder="Select Insurance required"
                />
              </SelectTrigger>
              <SelectContent
                {...register("insuranceRequired")}
                className="w-full"
              >
                <SelectGroup>
                  <SelectItem value="required">Required</SelectItem>
                  <SelectItem value="not-required">Not Required</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.insuranceRequired && (
              <p className="text-red-500 text-xs" role="alert">
                {errors.insuranceRequired?.message}
              </p>
            )}
          </div>
        </div>
        {error.includes("ACCESS DENIED") ? (
          <p className="text-red-500 text-xs pt-2">
            Your profile is not verified
          </p>
        ) : (
          <p className="text-red-500 text-xs pt-2">{error}</p>
        )}
        <div className="mt-5 flex justify-center">
          <Button
            type="submit"
            className="flex text-lg w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
          >
            {isLoading.isLoading ? "loading..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}
