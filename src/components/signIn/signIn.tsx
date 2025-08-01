"use client"
import cookie from "react-cookies"
import { useRouter } from "next/navigation"
import { SectionStarter } from "../sectionStarter"
import { Button } from "@/components/ui/button"
import { useLoginMutation } from "@/lib/features/auth/login-api-slice"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

// form-payload
type FormValues = {
  email: string
  password: string
}
export const SignIn = () => {
  // signIn api
  const [authenticateUser, isLoading] = useLoginMutation()
  //   setting error from api response
  const [error, setError] = useState("")
  //   using router for page navigation
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    authenticateUser(data)
      .unwrap()
      .then((res: any) => {
        if (res.data.accessToken) {
          cookie.save("token", res.data.accessToken, {
            maxAge: 365 * 24 * 60 * 60,
            path: "/",
          })
          router.push("/", { scroll: false })
        }
      })
      .catch((e) => {
        console.log("e", e)
        setError(e.data?.error.message)
      })
  }
  return (
    <div className="h-full bg-[#F2F7F6] items-center flex w-full justify-center">
      <div className="bg-white hidden lg:block fixed z-10 top-0 right-0 left-0 shadow">
        <div className="py-5 flex justify-between items-center container mx-auto">
          <div>
            <a href="/" className="text-black font-bold text-xl">
              INSURE <span className="text-[#E18B20]">AUTOGO</span>
            </a>
          </div>
        </div>
      </div>
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm bg-white py-4 px-5 rounded-lg w-full mx-auto"
      >
        <SectionStarter title="Login" description="" />
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <p className="text-red-500">{error}</p>
        <p className="text-center py-3">
          Don't have an account?{" "}
          <a className="text-orange-500" href="/signup">
            Sign up
          </a>
        </p>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="flex text-lg gap-2 stroke-white hover:stroke-[#E18B20]"
            variant={"orange"}
            size={"md"}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}
