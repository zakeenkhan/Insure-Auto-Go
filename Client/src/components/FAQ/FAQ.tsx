import { SectionStarter } from "../sectionStarter"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => {
  return (
    <div className="bg-[#F2F7F6] py-16">
      <div className="container mx-auto">
        <SectionStarter
          title="Frequently Asked Questions"
          description="Find answers to your questions from our previous answers"
        />
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem
              className="bg-white px-3 mt-3 rounded-md border border-1"
              value="item-1"
            >
              <AccordionTrigger className="font-bold lg:text-lg text-xs">
                How old do I need to be to rent a car?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer a diverse fleet of vehicles to suit every need,
                including compact cars, sedans, SUVs and luxury vehicles. You
                can browse our selection online or contact us for assistance in
                choosing the right vehicle for you
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-white px-3 mt-3 rounded-md border border-1"
              value="item-2"
            >
              <AccordionTrigger className="font-bold lg:text-lg text-xs">
                What documents do I need to rent a car?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer a diverse fleet of vehicles to suit every need,
                including compact cars, sedans, SUVs and luxury vehicles. You
                can browse our selection online or contact us for assistance in
                choosing the right vehicle for you
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-white px-3 mt-3 rounded-md border border-1"
              value="item-3"
            >
              <AccordionTrigger className="font-bold lg:text-lg text-xs">
                What types of vehicles are available for rent?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer a diverse fleet of vehicles to suit every need,
                including compact cars, sedans, SUVs and luxury vehicles. You
                can browse our selection online or contact us for assistance in
                choosing the right vehicle for you
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-white px-3 mt-3 rounded-md border border-1"
              value="item-4"
            >
              <AccordionTrigger className="font-bold lg:text-lg text-xs">
                Can I rent a car with a debit card?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer a diverse fleet of vehicles to suit every need,
                including compact cars, sedans, SUVs and luxury vehicles. You
                can browse our selection online or contact us for assistance in
                choosing the right vehicle for you
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-white px-3 mt-3 rounded-md border border-1"
              value="item-5"
            >
              <AccordionTrigger className="font-bold lg:text-lg text-xs">
                Can I add additional drivers to my rental agreement?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer a diverse fleet of vehicles to suit every need,
                including compact cars, sedans, SUVs and luxury vehicles. You
                can browse our selection online or contact us for assistance in
                choosing the right vehicle for you
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
