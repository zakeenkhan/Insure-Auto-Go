"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import car from "./car.png"
import thumbsUp from "./thumbs-up.png"
import styles from "./style.module.css"

export const HeroSection = () => {
  return (
    <div className={styles["hero-bg"]}>
      <div className="container mx-auto grid lg:grid-cols-2 md:grid-cols-1 gap-10 py-10">
        <div className="flex items-center">
          <div>
            <h1 className="font-bold text-4xl">LET&apos;S FIND YOUR</h1>
            <h1 className="font-bold text-4xl">
              COMPANION TO MOVE AROUND
            </h1>
            <div className="flex gap-5 py-3">
              <Button variant={"orange"} size={"lg"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.1145 2.63171L4.36467 5.32765C2.66557 5.93397 2.33489 7.83527 3.3962 9.08807C4.00973 9.81384 4.81568 10.3233 5.68606 10.552L7.15416 10.9374C11.5506 12.1044 15.7426 7.96803 14.617 3.33821L14.5484 3.05247C14.201 1.60304 13.1266 2.2904 12.1145 2.63171Z"
                    fill="white"
                  />
                  <path
                    d="M13.0897 13.4497L12.104 13.7327C9.3065 14.538 6.31405 13.377 4.78163 10.8863L11.8447 8.03395C13.6134 7.36535 15.0909 5.914 15.4228 4.03997L15.5538 3.29968C16.6695 1.05824 19.5294 2.23065 19.1543 5.25467C18.5457 10.1381 16.0212 12.4894 13.0897 13.4497Z"
                    fill="white"
                  />
                  <path
                    d="M5.52748 12.6698C5.36612 12.6181 5.20202 12.5755 5.03662 12.5413L3.7349 12.2658C3.21128 12.1559 2.7089 11.9572 2.25212 11.6797L2.19075 11.6727C1.90772 11.6407 1.81621 11.4662 1.82412 11.3355C1.82361 11.3231 1.82412 11.3107 1.82562 11.2983C1.8303 10.9856 2.13758 10.771 2.41601 10.8942C3.03919 11.1721 3.43915 11.7149 3.58633 12.3866L3.61379 12.5107C3.66347 12.7374 3.80253 12.9291 4.0054 13.0367C4.06114 13.0229 4.46662 13.1737 5.52748 12.6698Z"
                    fill="white"
                  />
                </svg>
                Immediate Search
              </Button>
              <Button
                className="flex gap-2 stroke-white hover:stroke-[#E18B20]"
                variant={"orangeSecondary"}
                size={"lg"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M1.66666 10.5C1.66666 5.8977 5.39768 2.16667 9.99999 2.16667C14.6023 2.16667 18.3333 5.8977 18.3333 10.5C18.3333 15.1023 14.6023 18.8333 9.99999 18.8333C5.39768 18.8333 1.66666 15.1023 1.66666 10.5Z"
                    stroke=""
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13.3333 10.5C13.3333 12.341 11.8409 13.8333 10 13.8333C8.15905 13.8333 6.66666 12.341 6.66666 10.5C6.66666 8.65906 8.15905 7.16667 10 7.16667C11.8409 7.16667 13.3333 8.65906 13.3333 10.5Z"
                    stroke=""
                    strokeWidth="1.5"
                  />
                </svg>
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Image width={24} height={24} src={thumbsUp} alt="thumbs-up" />
                <p className="text-xl font-semibold">100K+</p>
              </div>
              <p>People are using this</p>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <Image width={400} height={300} src={car} alt="car" />
        </div>
      </div>
    </div>
  )
}
