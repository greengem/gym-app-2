"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const StopwatchContext = createContext();

export const useStopwatch = () => useContext(StopwatchContext);

export const StopwatchProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const stop = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <StopwatchContext.Provider value={{ isRunning, time, start, pause, stop }}>
      {children}
    </StopwatchContext.Provider>
  );
};
