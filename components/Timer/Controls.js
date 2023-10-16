"use client";
import React from 'react';
import { useStopwatch } from '@/contexts/StopwatchContext';

const Controls = () => {
  const { isRunning, start, pause, stop } = useStopwatch();

  return (
    <div>
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={start}>Start</button>
      )}
      <button onClick={stop}>Stop</button>
    </div>
  );
};

export default Controls;
