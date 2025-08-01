"use client"
import { useState } from "react"

const Star = ({
  filled,
  onClick,
  readOnly,
}: {
  filled: boolean
  onClick?: () => void
  readOnly?: boolean
}) => (
  <span
    onClick={!readOnly ? onClick : undefined}
    className={`cursor-pointer text-2xl ${
      filled ? "text-yellow-500" : "text-gray-300"
    } ${readOnly ? "!cursor-default" : ""}`}
  >
    ★
  </span>
)
type RatingStarProps = {
  ratings?: number
  readonly?: boolean
  setCarRating?: React.Dispatch<React.SetStateAction<number>>
}
export const RatingStar = ({
  ratings,
  readonly,
  setCarRating,
}: RatingStarProps) => {
  const [rating, setRating] = useState(ratings || 1) // Initial rating is set to 0

  const handleRatingChange = (value: number) => {
    setRating(value)
    setCarRating && setCarRating(value)
  }

  return (
    <div className="flex gap-1 items-center">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            readOnly={readonly}
            filled={star <= rating}
            onClick={() => handleRatingChange(star)}
          />
        ))}
      </div>
      <p className="text-gray-700">{rating}</p>
    </div>
  )
}
