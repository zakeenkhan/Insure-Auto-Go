"use client"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Route Error captured:", error)
  }, [error])

  return (
    <div style={{ padding: 24 }}>
      <h2>Page error</h2>
      <p>{error?.message || "An unexpected error occurred."}</p>
      {error?.digest && <p>Reference: {error.digest}</p>}
      <button onClick={() => reset()} style={{ marginTop: 12 }}>
        Try again
      </button>
    </div>
  )
} 