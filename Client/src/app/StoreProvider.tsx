"use client"
import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "../lib/store"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    try {
      // Create the store instance the first time this renders
      storeRef.current = makeStore()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to create Redux store:", err)
      throw err
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
