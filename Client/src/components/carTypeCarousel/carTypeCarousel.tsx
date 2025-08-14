"use client"
import { useEffect } from "react"
import styles from "./style.module.css"

export const CarTypeCarousel = () => {
  useEffect(() => {
    if (typeof window === "undefined") return
    import("flickity").then(({ default: Flickity }) => {
      const carousel = document.querySelector(".main-carousel")
      if (carousel) {
        new Flickity(carousel as Element, {
          cellAlign: "left",
          contain: true,
        })
      }
    })
  }, [])
  return (
    <div>
      <div className="main-carousel">
        <div className={styles["flickity-viewport"]}></div>
      </div>
    </div>
  )
}
