"use client"
import React from "react"
import ActionQueueProvider from "./ActionQueueProvider"
import StoreProvider from "./StoreProvider"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
	return (
		<ActionQueueProvider>
			<StoreProvider>{children}</StoreProvider>
		</ActionQueueProvider>
	)
} 