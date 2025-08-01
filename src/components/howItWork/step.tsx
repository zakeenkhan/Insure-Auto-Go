import Image, { StaticImageData } from "next/image"

interface stepProps {
  image: StaticImageData
  title: string
  description: string
}
export const Step = ({ image, title, description }: stepProps) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Image width={50} src={image} alt="images" />
      </div>
      <h3 className="font-bold py-3">{title}</h3>
      <p className="text-xs text-center px-6">{description}</p>
    </div>
  )
}
