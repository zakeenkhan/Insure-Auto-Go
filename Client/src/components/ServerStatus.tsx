"use client"
import { useEffect, useState } from "react"

export const ServerStatus = () => {
  const [isServerRunning, setIsServerRunning] = useState<boolean | null>(null)

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:5555/', {
          method: 'GET',
          mode: 'cors',
        })
        setIsServerRunning(response.ok)
      } catch (error) {
        setIsServerRunning(false)
      }
    }

    checkServerStatus()
  }, [])

  if (isServerRunning === null) return null

  if (!isServerRunning) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm">Backend server not running</span>
        </div>
      </div>
    )
  }

  return null
} 