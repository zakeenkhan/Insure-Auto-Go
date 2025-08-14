"use client"
import {
  CarTypeCarousel,
  FAQ,
  FactsByNumber,
  Footer,
  Header,
  HeroSection,
  HowItWork,
  PopularCars,
  PopularDrivers,
  WhyChooseUs,
} from "@/components"
import { WhatPeopleSay } from "@/components/whatPeopleSay"
import { ServerStatus } from "@/components"

export default function Home() {
  return (
    <div>
      <Header />
      <ServerStatus />
      <HeroSection />
      <HowItWork />
      <PopularCars />
      <CarTypeCarousel />
      <PopularDrivers />
      <FactsByNumber />
      <WhyChooseUs />
      <WhatPeopleSay />
      <FAQ />
      <Footer />
    </div>
  )
}
