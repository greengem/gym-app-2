"use client";
import React from 'react';
import { useStopwatch } from '@/contexts/WorkoutContext';

const TimeDisplay = () => {
  const { time, workoutName } = useStopwatch();  // Get the workoutName from the context

  return (
    <div>
      <h2>Routine: {workoutName}</h2>
      <h1 className='text-4xl'>{time}s</h1>
      
    </div>
  );
};

export default TimeDisplay;
