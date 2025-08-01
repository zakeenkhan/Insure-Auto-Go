import Image from "next/image"
import { SectionStarter } from "../sectionStarter"
import "./style.css"
import review from "./review.jpeg"
export const WhatPeopleSay = () => {
  return (
    <div className="main-bg">
      <div className="container mx-auto">
        <div className="text-white">
          <SectionStarter
            title="What People say about us?"
            description="Discover what our customers have think about us"
          />
        </div>
        <div className="flex gap-5 py-12">
          <div className="bg-white rounded-xl p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="24"
              viewBox="0 0 29 24"
              fill="none"
            >
              <path
                d="M0 23.2373H11.8432V0H3.94774L0 23.2373ZM16.5198 23.2373H28.363V0H20.4675L16.5198 23.2373Z"
                fill="#FF9307"
              />
            </svg>
            <div className="flex py-5 items-center gap-5">
              <div>
                <Image
                  className="w-14 h-14 border-2 border-[#377384] rounded-full"
                  src={review}
                  alt="review"
                />
              </div>
              <div>
                <p className="font-bold text-lg">Lucas Moquin</p>
                <div className="pt-3">
                  <div className="flex">
                    <i className="fas fa-star filled"></i>
                  </div>
                  <p>(2.0)</p>
                </div>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="24"
              viewBox="0 0 29 24"
              fill="none"
            >
              <path
                d="M0 23.2373H11.8432V0H3.94774L0 23.2373ZM16.5198 23.2373H28.363V0H20.4675L16.5198 23.2373Z"
                fill="#FF9307"
              />
            </svg>
            <div className="flex py-5 items-center gap-5">
              <div>
                <Image
                  className="w-14 h-14 border-2 border-[#377384] rounded-full"
                  src={review}
                  alt="review"
                />
              </div>
              <div>
                <p className="font-bold text-lg">Lucas Moquin</p>
                <div className="pt-3">
                  <div className="flex">
                    <i className="fas fa-star filled"></i>
                  </div>
                  <p>(2.0)</p>
                </div>
              </div>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
