"use client";
import React from 'react';
import { useStopwatch } from '@/contexts/WorkoutContext';

const Controls = () => {
  const { isRunning, pause, stop } = useStopwatch();

  return (
    <div>
      {isRunning && <button onClick={pause}>Pause</button>}
      <button onClick={stop}>Stop</button>
    </div>
  );
};

export default Controls;
