"use client"
import cookie from "react-cookies"
import { useRouter } from "next/navigation"
import { SectionStarter } from "../sectionStarter"
import { Button } from "@/components/ui/button"
import { useSignupMutation } from "@/lib/features/auth/signup-api-slice"
import { useEffect, useRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useVerifyPhoneMutation } from "@/lib/features/auth/phone-verification"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
// import { Calendar } from "@/components/ui/calendar"
import Calendar from "react-calendar"
import { Label } from "@/components/ui/label"
import { format, set } from "date-fns"
import "react-calendar/dist/Calendar.css"
import { useS3photUploadMutation } from "@/lib/features/s3photo/s3photo-api"
import { Input } from "@/components/ui/input"
import cnic from "./id-card.png"
import Image from "next/image"

// form-payload
type FormValues = {
  email: string
  password: string
  cnic: string
  fullName: string
  phone: string
  dob: string
  cnicPhoto: string
}
type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]
export const SignUp = () => {
  // signIn api
  const [authenticateUser, isLoading] = useSignupMutation()
  // phone verification api
  const [verifyPhone] = useVerifyPhoneMutation()
  const [userEmail, setUserEmail] = useState<string>("")
  const [otp, setOtp] = useState<number>()
  const [selectedDate, setSelectedDate] = useState<Value>(new Date())
  //   setting error from api response
  const [error, setError] = useState("")
  // signup form
  const [signUpForm, setSignUpForm] = useState(true)
  // phone verification form
  const [phoneVerificationForm, setPhoneVerificationForm] = useState(false)
  //   using router for page navigation
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    authenticateUser(data)
      .unwrap()
      .then((res: any) => {
        if (res.statusCode === 201) {
          setPhoneVerificationForm(true)
          setSignUpForm(false)
          console.log(res)
        }
      })
      .catch((e) => {
        console.log("e", e)
        setError(e.data?.error.message)
      })
  }
  // cnic upload
  const [s3Photo] = useS3photUploadMutation()

  const [cnicPhoto, setCnicPhoto] = useState<any>(null)
  const [image, setImage] = useState("https://github.com/shadcn.png")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleCnicUpload = async (
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
              "cnicPhoto",
              (res as any)?.data?.url ? (res as any).data.url : ""
            )
          })
          .catch((error) => console.error("Error uploading to S3:", error))

        setCnicPhoto(file)
      }
    } else {
      console.log("No file selected.")
    }
  }
  const handleDummyUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("cnicPhoto", "https://github.com/shadcn.png")
  }
  useEffect(() => {
    handleCnicUpload
  }, [cnicPhoto])
  const removePhoto = (photo: any) => {
    setCnicPhoto(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the file input to allow re-selection of the same file
    }
  }
  return (
    <div className="flex-col bg-[#F2F7F6] items-center flex w-full justify-center">
      <div className="hidden lg:block fixed z-10 top-0 right-0 left-0">
        <div className="py-5 flex justify-between items-center container mx-auto">
          <div>
            <a href="/" className="text-black font-bold text-xl">
              INSURE <span className="text-[#E18B20]">AUTOGO</span>
            </a>
          </div>
        </div>
      </div>
      <div className="h-[10vh] w-full"></div>
      {/* <form
        // onSubmit={handleSubmit()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input {...register("email")} />
        {errors.email && <p>Email is required.</p>}
        <input {...register("password", { required: true })} />
        {errors.password && <p>Password is required.</p>}
        <input type="submit" />
      </form> */}
      {signUpForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg flex flex-wrap bg-white py-4 mb-5 px-5 rounded-lg w-full mx-auto"
        >
          <SectionStarter title="Register" description="" />
          <div className="mb-5 p-2 w-1/2">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              id="fullName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-5 p-2 w-1/2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              {...register("email")}
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="cnic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Phone Number
            </label>
            {/* <input
              {...register("phone")}
              type="text"
              maxLength={13}
              id="phone"
              minLength={13}
              size={13}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1234567890123"
              required
            /> */}
            <PhoneInput
              forceDialCode
              className=" w-full"
              defaultCountry="pk"
              onChange={(phone, meta) => {
                setValue("phone", phone)
              }}
            />
          </div>
          <div className="w-full mb-5">
            <Label
              htmlFor="PickupDate"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Date of birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={
                      Array.isArray(selectedDate)
                        ? "" // or some other default value if selectedDate is an array
                        : selectedDate
                        ? format(selectedDate, "PPP")
                        : ""
                    }
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
                  {...register("dob")}
                  onChange={setSelectedDate}
                  value={selectedDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-5 w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              maxLength={16}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {cnicPhoto && (
            <div className="mb-5 w-full flex justify-center">
              <div className="relative w-1/2">
                <Image
                  width={"100"}
                  height={"100"}
                  src={URL.createObjectURL(cnicPhoto)}
                  alt="avatar"
                  className="w-full h-[200px] object-fit"
                />
                <Button
                  type="button"
                  className="absolute top-0 bg-red-500 right-0 text-white h-5 w-3 rounded-full"
                  onClick={() => removePhoto(cnicPhoto)}
                >
                  &times;
                </Button>
              </div>
            </div>
          )}
          {cnicPhoto === null && (
            <>
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Please upload your CNIC
              </p>
              <div className="mb-5 w-full flex justify-center">
                {/* <Image
              width={"100"}
              height={"100"}
              src={cnic}
              alt="avatar"
              className="w-1/2 h-[200px] object-fit"
            /> */}
                <Label className="bg-white w-full flex justify-center items-end rounded-full p-1 cursor-pointer">
                  <Input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleCnicUpload}
                    className="hidden"
                  />
                  <Image
                    width={"100"}
                    height={"100"}
                    src={cnic}
                    alt="avatar"
                    className="w-1/2 h-[200px] object-fit"
                  />
                  <svg
                    width="50"
                    height="50"
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
            </>
          )}
          <div className="w-full">
            <p className="text-red-500">{error}</p>
            <p className="text-center py-3">
              Already have an account?{" "}
              <a className="text-orange-500" href="/signin">
                Log in Now
              </a>
            </p>
          </div>
          <div className="flex w-full justify-center">
            <Button
              type="submit"
              className="flex w-1/2 text-lg gap-2 stroke-white hover:stroke-[#E18B20]"
              variant={"orange"}
              size={"lg"}
            >
              Sign Up
            </Button>
          </div>
        </form>
      )}
      {phoneVerificationForm && (
        <div className="h-[90vh] flex justify-center items-center">
          <div className="max-w-sm bg-white py-4 px-5 rounded-lg w-full mx-auto">
            <SectionStarter title="Phone Verification" description="" />
            <div className="mb-5">
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Verification Otp
              </label>
              <input
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length > 6) {
                    e.target.value = value.slice(0, 6)
                  }
                  setOtp(Number(e.target.value))
                }}
                type="number"
                id="otp"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="---"
                required
              />
            </div>
            <p className="text-red-500">{error}</p>
            <p className="text-center py-3">
              Did not get Otp{" "}
              <a className="text-orange-500" href="/signin">
                resend
              </a>
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() =>
                  verifyPhone({ email: userEmail, otp: Number(otp) })
                    .unwrap()
                    .then((res) => {
                      console.log("Response from API:", res)

                      // Extract the token and save it
                      const accessToken = res.data.accessToken
                      cookie.save("token", accessToken, {
                        maxAge: 365 * 24 * 60 * 60,
                        path: "/",
                      })

                      // Redirect to home
                      router.push("/", { scroll: false })
                    })
                    .catch((error) => {
                      console.error("Error from API:", error) // Log any errors
                      setError(
                        error.data?.error?.message ||
                          "An unexpected error occurred."
                      )
                    })
                }
                className="flex text-lg gap-2 stroke-white hover:stroke-[#E18B20]"
                variant={"orange"}
                size={"md"}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
