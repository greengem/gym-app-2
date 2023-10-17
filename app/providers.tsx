"use client";

import { WorkoutProvider } from '@/contexts/WorkoutContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <WorkoutProvider>
      {children}
    </WorkoutProvider>
  )
}