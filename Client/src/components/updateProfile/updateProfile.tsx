"use client"
import { useRouter } from "next/navigation"
import { SectionStarter } from "../sectionStarter"
import { Button } from "@/components/ui/button"
import { useUpdateProfileMutation } from "@/lib/features/auth/update-api-slice"
import { useState, useEffect, useRef } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types"
import Image from "next/image"
import { useS3photUploadMutation } from "@/lib/features/s3photo/s3photo-api"

interface JwtPayload {
  fullName: string
  id: string
  cnicNumber: number
  contactNumber: number
  email: string
  password: number
  verification: number
}

interface updateProps {
  setUpdate: Function
  decodedData?: User | null
  setFullName: Function
}

type FormValues = {
  id: string
  fullName: string
  cnicNumber: number
  contactNumber: number
  email: string
  password: number
  verification: number
  profilePicture: string
}

export const UpdateProfile = ({
  setUpdate,
  decodedData,
  setFullName,
}: updateProps) => {
  const [authenticateUser, { isLoading }] = useUpdateProfileMutation()
  const [error, setError] = useState("")
  const router = useRouter()
  const [image, setImage] = useState("https://github.com/shadcn.png")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fullName: decodedData?.fullName || "",
    },
  })

  useEffect(() => {
    if (decodedData) {
      setValue("fullName", decodedData.fullName)
    }
  }, [decodedData, setValue])
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const [s3Photo] = useS3photUploadMutation()
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    authenticateUser(data)
      .unwrap()
      .then((res: any) => {
        if (res) {
          setFullName(res?.fullName)
          setUpdate(false)
        }
      })
      .catch((e) => {
        console.log("e", e)
        setError(e.data?.message)
      })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleCloseModal = () => {
    setUpdate(false)
  }

  const [profilePhoto, setProfilePhoto] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
              "profilePicture",
              (res as any)?.data?.url ? (res as any).data.url : ""
            )
          })
          .catch((error) => console.error("Error uploading to S3:", error))

        setProfilePhoto(file)
      }
    } else {
      console.log("No file selected.")
    }
  }
  useEffect(() => {
    handleS3PhotoUpload
  }, [profilePhoto])
  return (
    <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg bg-white py-6 px-7 h-[90vh] overflow-y-auto rounded-lg w-full mx-auto"
      >
        <div onClick={handleCloseModal} className="mb-5 inline-block">
          <p className="flex items-center text-xs font-normal gap-x-2 cursor-pointer">
            <Image
              width={"3"}
              height={"3"}
              className="w-3 h-3"
              src={"https://cdn-icons-png.flaticon.com/512/3686/3686446.png"}
              alt="Back"
            />
            Back
          </p>
        </div>
        <SectionStarter title="Profile Settings" description="" />
        <div className="mb-5 flex items-end justify-center">
          <img
            width={"24"}
            height={"24"}
            src={
              decodedData?.profilePicture ? decodedData.profilePicture : image
            }
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <Label className="bg-white rounded-full p-1 cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleS3PhotoUpload}
              className="hidden"
            />
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="#e08a20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.46058 2.46029C9.37267 2.36066 9.25344 2.30469 9.12912 2.30469C9.0048 2.30469 8.88557 2.36066 8.79767 2.46029L3.05242 8.97156C2.99353 9.03831 2.9514 9.12163 2.93035 9.21295L2.30535 11.9248C2.26329 12.1072 2.30975 12.3013 2.42743 12.4347C2.5451 12.568 2.71634 12.6207 2.87735 12.573L5.27011 11.8647C5.35069 11.8408 5.42421 11.7931 5.4831 11.7263L11.2283 5.21506C11.4114 5.00759 11.4114 4.67122 11.2283 4.46376L9.46058 2.46029ZM3.80527 9.62094L9.12912 3.58724L10.234 4.83941L4.91013 10.8731L3.41465 11.3158L3.80527 9.62094Z"
              />
              <path d="M2.5 13.638C2.24112 13.638 2.03125 13.8759 2.03125 14.1693C2.03125 14.4627 2.24112 14.7005 2.5 14.7005H11.875C12.1339 14.7005 12.3438 14.4627 12.3438 14.1693C12.3438 13.8759 12.1339 13.638 11.875 13.638H2.5Z" />
            </svg>
          </Label>
        </div>
        <div className="mb-5">
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Edit Name
          </Label>
          <Input
            {...register("fullName", { required: true })}
            type="text"
            id="fullName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Jhon Deo"
          />
          {errors.fullName && (
            <p className="text-red-500">Full Name is required</p>
          )}
        </div>
        {/* <div className="mb-5">
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Edit CNIC Number
          </Label>
          <Input
            {...register("cnicNumber", { required: true })}
            type="text"
            id="cnicNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="01234-56474745-5"
          />
          {errors.fullName && (
            <p className="text-red-500">CNIC Number is required</p>
          )}
        </div> */}
        <div className="mb-5">
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Edit Contact Number
          </Label>
          <Input
            {...register("contactNumber", { required: true })}
            type="text"
            id="contactNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+092,2345,56789"
          />
          {errors.fullName && (
            <p className="text-red-500">Contact Number is required</p>
          )}
        </div>
        {/* <div className="mb-5">
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Edit Email
          </Label>
          <Input
            {...register("email", { required: true })}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Johndeo@mail.com"
          />
          {errors.fullName && <p className="text-red-500">Email is required</p>}
        </div>
        <div className="mb-5">
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white">
            Edit Password
          </Label>
          <Input
            {...register("password", { required: true })}
            type="text"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="**********"
          />
          {errors.fullName && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>
        <div className="mb-5">
          <Label className="block mb-2 text-sm font-normal text-gray-900 dark:text-white"></Label>
          <Input
            {...register("verification", { required: true })}
            type="text"
            id="verification"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-xs dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Verification"
          />
          {errors.fullName && (
            <p className="text-red-500">Verification is required</p>
          )}
        </div> */}

        <p className="text-red-500">{error}</p>
        <div className="mt-5 flex justify-center">
          <Button
            type="submit"
            className="flex text-lg w-full gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
