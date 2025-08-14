"use client"
import React, { createContext, useCallback, useContext, useMemo, useRef } from "react"

export type QueuedTask = () => void

export type ActionQueue = {
  enqueue: (task: QueuedTask) => void
  flush: () => void
  clear: () => void
}

export const ActionQueueContext = createContext<ActionQueue | null>(null)

export function useActionQueue(): ActionQueue {
  const ctx = useContext(ActionQueueContext)
  if (!ctx) {
    throw new Error("Invariant: Missing ActionQueueContext")
  }
  return ctx
}

export default function ActionQueueProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queueRef = useRef<QueuedTask[]>([])
  const isFlushingRef = useRef(false)

  const flush = useCallback(() => {
    if (isFlushingRef.current) return
    isFlushingRef.current = true
    try {
      let task: QueuedTask | undefined
      while ((task = queueRef.current.shift())) {
        try {
          task()
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("ActionQueue task error:", err)
        }
      }
    } finally {
      isFlushingRef.current = false
    }
  }, [])

  const enqueue = useCallback(
    (task: QueuedTask) => {
      queueRef.current.push(task)
      if (typeof queueMicrotask === "function") {
        queueMicrotask(flush)
      } else {
        Promise.resolve().then(flush)
      }
    },
    [flush]
  )

  const clear = useCallback(() => {
    queueRef.current = []
  }, [])

  const value = useMemo<ActionQueue>(() => ({ enqueue, flush, clear }), [enqueue, flush, clear])

  return <ActionQueueContext.Provider value={value}>{children}</ActionQueueContext.Provider>
} 