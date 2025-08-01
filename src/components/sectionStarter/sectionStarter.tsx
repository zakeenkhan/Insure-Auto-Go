import headingLine from "./underline.png"
import Image from "next/image"
interface sectionStarterProps {
  title: string
  description: string
}
export const SectionStarter = ({ title, description }: sectionStarterProps) => {
  return (
    <div className="container mx-auto">
      <div>
        <h2 className="font-bold pt-4 text-center text-2xl">{title}</h2>
        <div className="flex pt-2 justify-center">
          <Image width={35} src={headingLine} alt="line" />
        </div>
      </div>
      <div className="flex justify-center">
        <p className="lg:w-2/5 lg:px-4 px-2 pt-5 text-center">{description}</p>
      </div>
    </div>
  )
}
