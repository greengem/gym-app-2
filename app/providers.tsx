"use client";

import { StopwatchProvider } from '@/contexts/StopwatchContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <StopwatchProvider>
      {children}
    </StopwatchProvider>
  )
}