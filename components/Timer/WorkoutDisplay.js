"use client";
import { useWorkout } from '@/contexts/WorkoutContext';

const WorkoutDisplay = () => {
  const {
    time, workoutName, 
    currentExercise, progress, 
    workoutData, completedSets
  } = useWorkout();

  if (!workoutData) {
    return <div>Loading...</div>; 
  }

  const currentExerciseObject = workoutData.WorkoutPlanExercise[currentExercise];
  const totalSets = workoutData && workoutData.WorkoutPlanExercise ? workoutData.WorkoutPlanExercise.reduce((sum, exercise) => sum + exercise.sets, 0) : 0;
  const completedSetsCount = completedSets.length;
  const progressPercentage = totalSets !== 0 ? (completedSetsCount / totalSets) * 100 : 0;

  return (
    <div>
      <h2>Routine: {workoutName}</h2>
      <h1 className='text-4xl'>{time}s</h1>
      <div className="mt-4">
        <h3>Current Exercise: {currentExerciseObject?.Exercise?.name}</h3>
        <h3>Current Set: {completedSetsCount + 1} out of {totalSets}</h3>
        <div>
          <label>Progress: </label>
          <progress value={progressPercentage} max="100"></progress> 
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDisplay;
