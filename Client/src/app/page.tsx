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

export default function Home() {
  return (
    <div>
      <Header />
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
