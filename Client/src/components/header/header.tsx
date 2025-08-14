"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import logo from "./LOGO.png"
import approved from "./approved.png"
import { Button } from "@/components/ui/button"
import styles from "./style.module.css"
import { useEffect, useState } from "react"
import cookie from "react-cookies"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetMeQuery } from "@/lib/features/user/me-api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UpdateProfile } from "../updateProfile"
import { CarRental } from "../carRental"
import { User } from "@/types"
import { CreateDriver } from "../createDriver"

type JwtPayload = {
  email: string
  fullName: string
  id: string
  cnicNumber: number
  contactNumber: number
  password: number
  verification: number
  isVerified: boolean
}
export const Header = () => {
  // user
  const [userDetails, setUserDetails] = useState<User>()
  // fullName
  const [fullName, setFullName] = useState("")
  // loading token from cookie
  const [token, setToken] = useState<string | null>(null);
  const [decodedData, setDecodedData] = useState<JwtPayload | null>(null);

  const { data: user, error, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: !token, // Skip the query if there's no token
  });
  // setting width for hamburger
  const [width, setWidth] = useState<string>("0%")
  //   using router for page navigation
  const router = useRouter()
  const logOut = () => {
    cookie.remove("token", { path: "/" })
    setToken(null); // Clear token state on logout
    router.push("/signin")
  }
  const [update, setUpdate] = useState<boolean>(false)

  // move popup and modal state above useEffect to avoid TDZ
  const [open, setOpen] = useState<boolean>(false)
  const [isCreateDriverOpen, setIsCreateDriverOpen] = useState<boolean>(false)
  const [successPopup, setSuccessPopup] = useState<boolean>(false)
  const [driverSuccessPopup, setDriverSuccessPopup] = useState<boolean>(false)
  const [selectedCar, setSelectedCar] = useState(null)
  
  useEffect(() => {
    // Load token and decode only on the client side
    const clientToken = cookie.load("token");
    setToken(clientToken);
    const decoded = clientToken ? jwtDecode<JwtPayload>(clientToken) : null;
    setDecodedData(decoded);

    if (!isLoading && user) {
      setUserDetails(user as User)
    }
    // Only set full name if decoded is available and has fullName
    if (decoded?.fullName) {
      setFullName(decoded.fullName);
    }
    if (successPopup || driverSuccessPopup) {
      setTimeout(() => {
        setSuccessPopup(false)
        setDriverSuccessPopup(false)
      }, 3000)
    }
  }, [isLoading, user, successPopup, driverSuccessPopup]) // Removed decodedData

  const handleCarSelection = (carInfo: any) => {
    setSelectedCar(carInfo)
    setOpen(false)
  }

  return (
    <div>
      {/* main-header */}
      <div className="bg-white hidden lg:block fixed z-10 top-0 right-0 left-0 shadow">
        <div className="py-5 flex justify-between items-center container mx-auto">
          <div>
            <a href="/" className="text-black font-bold text-xl">
              INSURE <span className="text-[#E18B20]">AUTOGO</span>
            </a>
          </div>
          {userDetails?.isVerified && (
            <nav>
              <ul className="flex w-full gap-10 justify-between">
                <li className="hover:text-[#E18B20]">
                  <a href="/">Home</a>
                </li>
                <li className="hover:text-[#E18B20]">
                  <a href="/cars">Cars</a>
                </li>
                <li className="hover:text-[#E18B20]">
                  <a href="/drivers">Drivers</a>
                </li>
                <li className="hover:text-[#E18B20]">
                  <a href="">Contact Us</a>
                </li>
                <li className="hover:text-[#E18B20]">
                  <a href="/messages">Messages</a>
                </li>
              </ul>
            </nav>
          )}
          {token && !error ? (
            <div className="flex gap-4">
              <Button
                onClick={() => setOpen(true)}
                className="hover:stroke-black stroke-white flex gap-2 items-center"
                variant={"black"}
                size={"lg"}
              >
                Post Car
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex gap-2 stroke-white hover:stroke-[#E18B20]"
                    variant={"orangeSecondary"}
                    size={"lg"}
                  >
                    <Avatar>
                      <AvatarImage
                        src={
                          userDetails?.profilePicture
                            ? userDetails.profilePicture
                            : "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {userDetails?.fullName}
                    <svg
                      className="rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M3.63604 12.636L10 6.27208L16.364 12.636"
                        stroke="white"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex justify-between">
                    <p className="text-sm">Status</p>
                    <p
                      className={`text-sm border rounded-xl px-2 ${
                        userDetails?.isVerified
                          ? "border-green-500 text-green-500"
                          : "border-red-500 text-red-500"
                      }`}
                    >
                      {userDetails?.isVerified ? "Verified" : "Pending"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {userDetails && userDetails?.driver?.length! > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Driver</p>
                        <Image
                          className="mr-4"
                          width={30}
                          height={20}
                          src={approved}
                          alt="driver-approved"
                        />
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => setUpdate(true)}>
                    Profile Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <a href="/booking">Bookings</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Car List</DropdownMenuItem>
                  {userDetails && userDetails?.driver?.length <= 0 ? (
                    <DropdownMenuItem
                      onClick={() => setIsCreateDriverOpen(true)}
                    >
                      Create Driver Profile
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <a href="/hiring">Hiring</a>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 hover:!text-red-500"
                    onClick={() => logOut()}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-4">
              {error && (
                <div className="text-red-500 text-sm">
                  Error loading user data. Please log in again.
                </div>
              )}
              {!token && (
                <div className="text-blue-500 text-sm">
                  Please log in to access your account.
                </div>
              )}
              <a href="/signin">
                <Button
                  className="hover:stroke-black stroke-white flex gap-2 items-center"
                  variant={"black"}
                  size={"lg"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M10 8.83317C11.841 8.83317 13.3334 7.34079 13.3334 5.49984C13.3334 3.65889 11.841 2.1665 10 2.1665C8.15907 2.1665 6.66669 3.65889 6.66669 5.49984C6.66669 7.34079 8.15907 8.83317 10 8.83317Z"
                      stroke=""
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.6646 15.5002C16.6666 15.3633 16.6666 15.2243 16.6666 15.0835C16.6666 13.0124 13.6819 11.3335 9.99998 11.3335C6.31808 11.3335 3.33331 13.0124 3.33331 15.0835C3.33331 17.1546 3.33331 18.8335 9.99998 18.8335C11.8591 18.8335 13.1998 18.7029 14.1666 18.4697"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Login
                </Button>
              </a>
              <a href="/signup">
                <Button
                  className="flex gap-2 stroke-white hover:stroke-[#E18B20]"
                  variant={"orange"}
                  size={"lg"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M5.83331 8.85733C6.22616 8.83333 6.71047 8.83333 7.33331 8.83333H12.6666C13.2895 8.83333 13.7738 8.83333 14.1666 8.85733M5.83331 8.85733C5.34305 8.88725 4.99522 8.95458 4.69834 9.10583C4.22793 9.3455 3.84548 9.72792 3.6058 10.1983C3.33331 10.7332 3.33331 11.4332 3.33331 12.8333V14C3.33331 15.4002 3.33331 16.1002 3.6058 16.635C3.84548 17.1054 4.22793 17.4878 4.69834 17.7275C5.23311 18 5.93318 18 7.33331 18H12.6666C14.0668 18 14.7668 18 15.3016 17.7275C15.7721 17.4878 16.1545 17.1054 16.3941 16.635C16.6666 16.1002 16.6666 15.4002 16.6666 14V12.8333C16.6666 11.4332 16.6666 10.7332 16.3941 10.1983C16.1545 9.72792 15.7721 9.3455 15.3016 9.10583C15.0047 8.95458 14.6569 8.88725 14.1666 8.85733M5.83331 8.85733V7.16667C5.83331 4.86548 7.6988 3 9.99998 3C12.3011 3 14.1666 4.86548 14.1666 7.16667V8.85733"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Register
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
      {/* <!-- ==================== mobile-menu =============== --> */}
      {/* <!-- Mobile menu button--> */}
      <div className="bg-white fixed z-10 top-0 right-0 left-0 shadow xl:hidden">
        <div className="py-4 px-5 flex justify-between items-center">
          {/* <!-- Mobile menu button--> */}
          <div>
            <div>
              <li className="w-1/2 flex items-center">
                <a href="">
                  <Image width={120} height={40} src={logo} alt="logo" />
                </a>
              </li>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-4">
              <a href="/signin">
                <Button
                  className="hover:stroke-black stroke-white flex gap-2 items-center"
                  variant={"black"}
                  size={"sm"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M10 8.83317C11.841 8.83317 13.3334 7.34079 13.3334 5.49984C13.3334 3.65889 11.841 2.1665 10 2.1665C8.15907 2.1665 6.66669 3.65889 6.66669 5.49984C6.66669 7.34079 8.15907 8.83317 10 8.83317Z"
                      stroke=""
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16.6646 15.5002C16.6666 15.3633 16.6666 15.2243 16.6666 15.0835C16.6666 13.0124 13.6819 11.3335 9.99998 11.3335C6.31808 11.3335 3.33331 13.0124 3.33331 15.0835C3.33331 17.1546 3.33331 18.8335 9.99998 18.8335C11.8591 18.8335 13.1998 18.7029 14.1666 18.4697"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Login
                </Button>
              </a>
              <a href="/signup">
                <Button
                  className="flex gap-2 stroke-white hover:stroke-[#E18B20]"
                  variant={"orange"}
                  size={"sm"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <path
                      d="M5.83331 8.85733C6.22616 8.83333 6.71047 8.83333 7.33331 8.83333H12.6666C13.2895 8.83333 13.7738 8.83333 14.1666 8.85733M5.83331 8.85733C5.34305 8.88725 4.99522 8.95458 4.69834 9.10583C4.22793 9.3455 3.84548 9.72792 3.6058 10.1983C3.33331 10.7332 3.33331 11.4332 3.33331 12.8333V14C3.33331 15.4002 3.33331 16.1002 3.6058 16.635C3.84548 17.1054 4.22793 17.4878 4.69834 17.7275C5.23311 18 5.93318 18 7.33331 18H12.6666C14.0668 18 14.7668 18 15.3016 17.7275C15.7721 17.4878 16.1545 17.1054 16.3941 16.635C16.6666 16.1002 16.6666 15.4002 16.6666 14V12.8333C16.6666 11.4332 16.6666 10.7332 16.3941 10.1983C16.1545 9.72792 15.7721 9.3455 15.3016 9.10583C15.0047 8.95458 14.6569 8.88725 14.1666 8.85733M5.83331 8.85733V7.16667C5.83331 4.86548 7.6988 3 9.99998 3C12.3011 3 14.1666 4.86548 14.1666 7.16667V8.85733"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Register
                </Button>
              </a>
            </div>
            <button
              onClick={() => setWidth("100%")}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white bg-[#E18B20] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className="block h-6 text-white bg-putple-600 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="">
        <div style={{ width: width }} className={styles.overlay}>
          <button
            type="button"
            onClick={() => setWidth("0%")}
            className="closebtn text-6xl absolute top-4 right-4 mr-10 font-semibold text-white"
          >
            &times;
          </button>
          <div className="space-y-1 mt-16 px-2 pt-2 pb-3">
            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Home
            </a>

            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>

            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              API
            </a>
            <a
              href="#"
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
      {update && (
        <div className="fixed inset-0 z-50">
          <UpdateProfile
            decodedData={userDetails || null}
            setUpdate={setUpdate}
            setFullName={setFullName}
          />
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-50">
          <CarRental
            setSuccessPopup={setSuccessPopup}
            setOpen={setOpen}
            onCarSelect={handleCarSelection}
          />
        </div>
      )}
      {isCreateDriverOpen && (
        <div className="fixed inset-0 z-50">
          <CreateDriver
            setSuccessPopup={setDriverSuccessPopup}
            setIsCreateDriverOpen={setIsCreateDriverOpen}
            onCarSelect={handleCarSelection}
          />
        </div>
      )}
      {successPopup && (
        <div className="fixed inset-0 z-50">
          <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
            <div className="max-w-xl bg-white h-[50vh] p-3  rounded-lg w-full mx-auto">
              <div className="flex w-full justify-end">
                <button
                  className="text-black text-xl"
                  onClick={() => setSuccessPopup(false)}
                >
                  X
                </button>
              </div>
              <div className="flex h-full justify-center flex-col py-6 px-7 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  style={{
                    width: "100",
                    height: "100",
                    verticalAlign: "middle",
                    fill: "currentColor",
                    overflow: " hidden",
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                >
                  <path
                    d="M512 0C229.668571 0 0 229.668571 0 512s229.668571 512 512 512 512-229.668571 512-512S794.331429 0 512 0z m307.2 343.771429s-267.702857 295.497143-327.68 365.714285c-59.977143 70.217143-106.788571 0-106.788571 0L210.651429 529.554286s-27.794286-42.422857 21.942857-81.92c46.811429-38.034286 84.845714 0 84.845714 0l122.88 128.731428L746.057143 291.108571s29.257143-20.48 59.977143 5.851429c23.405714 21.942857 13.165714 46.811429 13.165714 46.811429z"
                    fill="#68BF7B"
                  />
                </svg>
                <p className="pt-4 text-xl">Your Car has been Posted</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {driverSuccessPopup && (
        <div className="fixed inset-0 z-50">
          <div className="h-full backdrop-blur bg-orange-300/20 items-center flex w-full justify-center">
            <div className="max-w-xl bg-white h-[50vh] p-3  rounded-lg w-full mx-auto">
              <div className="flex w-full justify-end">
                <button
                  className="text-black text-xl"
                  onClick={() => setDriverSuccessPopup(false)}
                >
                  X
                </button>
              </div>
              <div className="flex h-full justify-center flex-col py-6 px-7 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  style={{
                    width: "100",
                    height: "100",
                    verticalAlign: "middle",
                    fill: "currentColor",
                    overflow: " hidden",
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                >
                  <path
                    d="M512 0C229.668571 0 0 229.668571 0 512s229.668571 512 512 512 512-229.668571 512-512S794.331429 0 512 0z m307.2 343.771429s-267.702857 295.497143-327.68 365.714285c-59.977143 70.217143-106.788571 0-106.788571 0L210.651429 529.554286s-27.794286-42.422857 21.942857-81.92c46.811429-38.034286 84.845714 0 84.845714 0l122.88 128.731428L746.057143 291.108571s29.257143-20.48 59.977143 5.851429c23.405714 21.942857 13.165714 46.811429 13.165714 46.811429z"
                    fill="#68BF7B"
                  />
                </svg>
                <p className="pt-4 text-xl">Driver profile has been Created</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
