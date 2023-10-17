"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const WorkoutContext = createContext({
  isRunning: false,
  time: 0,
  workoutName: '',
  currentExercise: 0,
  progress: 0,
  workoutData: null,
  completedSets: []
});

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [workoutName, setWorkoutName] = useState("");
  const timerRef = useRef(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSets, setCompletedSets] = useState([]);
  const [workoutData, setWorkoutData] = useState(null);

  const totalSets = workoutData ? workoutData.reduce((sum, exercise) => sum + exercise.sets, 0) : 0;

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    setProgress((completedSets.length / totalSets) * 100);
  }, [completedSets, totalSets]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const stop = () => {
    setIsRunning(false);
    setTime(0);
    setCurrentExercise(0);
    setCompletedSets([]);
    setProgress(0);
  };

  const markSetComplete = (exerciseIndex, setIndex) => {
    setCompletedSets(prev => [...prev, { exerciseIndex, setIndex }]);
    if (exerciseIndex === currentExercise) {
      setCurrentExercise(prev => prev + 1);
    }
};


  return (
    <WorkoutContext.Provider value={{
      isRunning, time, start, pause, stop,
      workoutName, setWorkoutName,
      currentExercise, progress,
      workoutData, setWorkoutData,
      markSetComplete
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};
