"use client"
import Image from "next/image"
import "./style.css"
import thumbsUp from "./thumbs-up.png"
import car from "./car.png"
import { Button } from "../ui/button"

export const HeroSection = () => {
  return (
    <div className="hero-bg flex items-center">
      <div className="container flex flex-col lg:flex-row pt-24 mx-auto">
        <div className="lg:w-1/2 w-full">
          <div className="bg-white w-fit flex items-center gap-2 rounded-2xl px-4 py-2">
            <Image width={25} src={thumbsUp} alt="thumbs-up" />
            <p className="text-black">
              100% Trusted car rental platform in the World
            </p>
          </div>
          <div className="pt-5">
            <h1 className="lg:text-6xl text-4xl leading-tight font-extrabold text-[#E18B20]">
              <span className="text-black">Find Your Best</span> <br />
              Dream Car for <br />
              Rental
            </h1>
            <p className="py-5 lg:w-3/4 text-sm">
              Experience the ultimate in comfort, performance, and
              sophistication with our luxury car rentals. From sleek sedans and
              stylish coupes to spacious SUVs and elegant convertibles, we offer
              a range of premium vehicles to suit your preferences and
              lifestyle.
            </p>
            <a href="/cars">
              <Button
                className="mt-4 fill-white hover:fill-[#E18B20] flex gap-2 items-center"
                variant={"orange"}
                size={"md"}
              >
                View All Cars{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill=""
                >
                  <path
                    d="M15.5303 7.03033C15.8232 6.73744 15.8232 6.26256 15.5303 5.96967L10.7574 1.1967C10.4645 0.903806 9.98959 0.903806 9.6967 1.1967C9.40381 1.48959 9.40381 1.96447 9.6967 2.25736L13.9393 6.5L9.6967 10.7426C9.40381 11.0355 9.40381 11.5104 9.6967 11.8033C9.98959 12.0962 10.4645 12.0962 10.7574 11.8033L15.5303 7.03033ZM0 7.25L15 7.25V5.75L0 5.75L0 7.25Z"
                    fill=""
                  />
                </svg>
              </Button>
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 ">
          <Image className="w-11/12" src={car} alt="car" />
        </div>
      </div>
    </div>
  )
}
