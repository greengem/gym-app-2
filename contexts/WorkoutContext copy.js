"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [workoutName, setWorkoutName] = useState("");
  const timerRef = useRef(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSets = 10; 

  const completeSet = () => {
    setProgress((currentExercise * totalSets + currentSet + 1) / totalSets * 100);
    setCurrentSet(prevSet => prevSet + 1);
    if (currentSet >= totalSets - 1) {
      setCurrentSet(0);
      setCurrentExercise(prevExercise => prevExercise + 1);
    }
  };

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
    <WorkoutContext.Provider value={{ 
        isRunning, 
        time, 
        start, 
        pause, 
        stop,
        workoutName,
        setWorkoutName,
        currentExercise,
        currentSet,
        progress,
        completeSet,
        setCurrentSet
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};
