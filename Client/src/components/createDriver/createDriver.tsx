"use client"
import { useEffect, useRef, useState } from "react"
import { SectionStarter } from "../sectionStarter"
import { format } from "date-fns"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler } from "react-hook-form"
import { useDriverMutation } from "@/lib/features/driver/create-driver-api"
import { useS3photUploadMutation } from "@/lib/features/s3photo/s3photo-api"
import { Calendar } from "../ui/calendar"
import Image from "next/image"

type DriverValues = {
  licenseNo: string
  licenseExpiry: string
  licensePicture: string
  lisenceType: string
  driverPicture: string
  city: string
  per12HoursRate: number
}
interface CreateDriverProps {
  setIsCreateDriverOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSuccessPopup: React.Dispatch<React.SetStateAction<boolean>>
  onCarSelect: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateDriver: React.FC<CreateDriverProps> = ({
  setIsCreateDriverOpen,
  setSuccessPopup,
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
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DriverValues>()
  const [createDriver, isLoading] = useDriverMutation()
  const [s3Photo] = useS3photUploadMutation()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const onSubmit: SubmitHandler<DriverValues> = (data: DriverValues) => {
    createDriver({ ...data, licenseExpiry: selectedDate?.toString() || "" })
      .unwrap()
      .then((res) => {
        console.log(res, "carResponse")
        res && setIsCreateDriverOpen(false)
        res && setSuccessPopup(true)
      })
      .catch((e) => {
        setError(e.data.error.message)
      })
    isLoading.isSuccess && setIsCreateDriverOpen(false)
  }

  const [carPhotos, setCarPhotos] = useState<File[]>([])
  const [carPhoto, setCarPhoto] = useState<any>(null)
  const [licensePhoto, setLicensePhoto] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const licenseInputRef = useRef<HTMLInputElement | null>(null)
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
              "driverPicture",
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
  const handleLicensePhotoUpload = async (
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
              "licensePicture",
              (res as any)?.data?.url ? (res as any).data.url : ""
            )
          })
          .catch((error) => console.error("Error uploading to S3:", error))

        setLicensePhoto(file)
      }
    } else {
      console.log("No file selected.")
    }
  }
  useEffect(() => {
    handleS3PhotoUpload
    handleLicensePhotoUpload
  }, [carPhoto, licensePhoto])
  const handlePickDate = (day: Date | undefined) => {
    setSelectedDate(day || null)
  }
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
  const removeLicensePhoto = (photo: any) => {
    setLicensePhoto(null)
    if (licenseInputRef.current) {
      licenseInputRef.current.value = "" // Reset the file input to allow re-selection of the same file
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
    setIsCreateDriverOpen(false)
  }

  return (
    <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl bg-white h-[90vh] overflow-y-auto py-6 px-7 rounded-lg w-full mx-auto"
      >
        <div onClick={handleCloseModal} className="mb-5 inline-block">
          <p className="flex items-center text-xs font-normal gap-x-2 cursor-pointer">
            <Image
              className="w-3 h-3"
              width={"3"}
              height={"3"}
              src="https://cdn-icons-png.flaticon.com/512/3686/3686446.png"
              alt="Back"
            />
            Back
          </p>
        </div>
        <SectionStarter title="Driver Profile" description="" />
        <div>
          {carPhotos.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-2 flex-wrap mt-2">
                {carPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      width={"20"}
                      height={"20"}
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
                  <Image
                    width={"32"}
                    height={"32"}
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
            Upload Driver Photo
          </Button>
          {errors.driverPicture && (
            <p
              className="text-red-500 text-center py-2 w-full text-xs"
              role="alert"
            >
              {errors.driverPicture?.message}
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
            {...register("driverPicture", {
              required: "Driver Picture is Required",
            })}
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

        {/*  */}
        <div>
          {licensePhoto && (
            <div className="mb-4">
              <div className="flex justify-center gap-2 flex-wrap mt-2">
                <div className="relative">
                  <Image
                    width={"32"}
                    height={"32"}
                    src={URL.createObjectURL(licensePhoto)}
                    alt={`car-photo`}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <Button
                    type="button"
                    className="absolute top-0 bg-red-500 right-0 text-white h-5 w-3 rounded-full"
                    onClick={() => removeLicensePhoto(licensePhoto)}
                  >
                    &times;
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="my-5 mx-10  gap-x-10 items-center">
          <Button
            type="button"
            className="flex text-sm font-normal w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
            onClick={() =>
              document.getElementById("licensePhotoInput")?.click()
            }
          >
            Upload License Photo
          </Button>
          {errors.licensePicture && (
            <p
              className="text-red-500 text-center py-2 w-full text-xs"
              role="alert"
            >
              {errors.licensePicture?.message}
            </p>
          )}
        </div>
        <div>
          <Input
            {...register("licensePicture", {
              required: "This license Picture is required",
            })}
            type="file"
            id="licensePhotoInput"
            className="hidden"
            ref={licenseInputRef}
            onChange={handleLicensePhotoUpload}
            accept="image/*"
          />
        </div>
        {/*  */}
        <div className="grid lg:grid-cols-2 gap-4 mb-5">
          {/* license Number */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              License Number
            </Label>
            <div>
              <input
                {...register("licenseNo", { required: true })}
                type="text"
                id="licenseNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Enter license Number"
              />
            </div>
          </div>
          {/* Expiry Date */}
          <div className="w-full">
            <Label
              htmlFor="PickupDate"
              className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"
            >
              Expiry Date
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
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
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
          {/* Car Type */}
          <div>
            <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
              License Type
            </Label>
            <div>
              <Select onValueChange={(value) => setValue("lisenceType", value)}>
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <SelectValue
                    className="text-gray-400 text-xs"
                    placeholder="Select a car type"
                  />
                </SelectTrigger>
                <SelectContent
                  {...register("lisenceType", {
                    required: "Car type is required",
                  })}
                  className="w-full"
                >
                  <SelectGroup>
                    <SelectItem value="Motorcar/jeep">Motorcar/jeep</SelectItem>
                    <SelectItem value="LTV">LTV</SelectItem>
                    <SelectItem value="HTV">HTV</SelectItem>
                    <SelectItem value="PSV">PSV</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.lisenceType && (
                <p className="text-red-500 text-xs" role="alert">
                  {errors.lisenceType?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {error.includes("ACCESS DENIED") ? (
          <p className="text-red-500 text-xs pt-2">
            Your profile is not verified
          </p>
        ) : (
          <p className="text-red-500 text-xs pt-2">{error}</p>
        )}
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

        {/* Price */}
        <div>
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Per Day Rent
          </Label>
          <div>
            <input
              onChange={(e) =>
                setValue("per12HoursRate", Number(e.target.value))
              }
              type="number"
              id="rentPerDay"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="4000"
            />
          </div>
        </div>
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
