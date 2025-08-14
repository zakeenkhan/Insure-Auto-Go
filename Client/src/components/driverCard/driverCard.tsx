"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import driver from "./driver.png"
import styles from "./style.module.css"

// Default driver image (using a placeholder from a public CDN)
const DEFAULT_DRIVER_IMAGE = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export const DriverCard = ({ name, picture }: { name: string; picture?: string }) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(picture)
  const [hasError, setHasError] = useState(false)

  // Convert relative URLs to absolute if needed
  useEffect(() => {
    if (picture && !picture.startsWith('http') && !picture.startsWith('blob:')) {
      // If it's a relative path, prepend the API base URL
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      setImgSrc(`${baseUrl}${picture.startsWith('/') ? '' : '/'}${picture}`);
    } else {
      setImgSrc(picture);
    }
  }, [picture]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(driver.src);
    }
  };

  return (
    <div className={`${styles.card} bg-white rounded-xl p-5`}>
      <div className="flex py-5 items-center gap-5">
        <div>
          <Image 
            width={56} 
            height={56} 
            className="w-14 h-14 border-2 border-[#377384] rounded-full object-cover" 
            src={imgSrc || driver.src}
            alt={`${name || 'Driver'} profile`}
            onError={handleError}
            unoptimized={hasError || !imgSrc} // Disable optimization for fallback image
          />
        </div>
        <div>
          <p className="font-bold text-lg">{name}</p>
        </div>
      </div>
    </div>
  )
}
