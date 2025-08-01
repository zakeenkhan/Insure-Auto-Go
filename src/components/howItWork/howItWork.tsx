import { Step } from "./step"
import book from "./book.png"
import pick from "./pick.png"
import location from "./location.png"
import { SectionStarter } from "../sectionStarter"
export const HowItWork = () => {
  return (
    <div className="container py-16 mx-auto">
      <SectionStarter
        title="How It Works"
        description="Booking a car rental is a straightforward process that typically
          involves the following steps"
      />
      <div className="flex flex-col lg:flex-row justify-center mt-5 py-5 gap-5">
        <div className="lg:w-1/4">
          <Step
            image={location}
            title="1. Choose Locations"
            description="Determine the date & location for your car rental. Consider factors such as your travel itinerary, pickup/drop-off locations (e.g., airport, city center) and duration of rental."
          />
        </div>
        <div className="lg:w-1/4">
          <Step
            image={pick}
            title="2. Pick-Up Locations"
            description="Check the availability of your desired vehicle type for your chosen dates and location. Ensure that the rental rates, taxes, fees, and any additional charges."
          />
        </div>
        <div className="lg:w-1/4">
          <Step
            image={book}
            title="3. Book your Car"
            description="Once you've found car rental option, proceed to make a reservation. Provide the required information, including your details, driver's license, and payment details."
          />
        </div>
      </div>
    </div>
  )
}
