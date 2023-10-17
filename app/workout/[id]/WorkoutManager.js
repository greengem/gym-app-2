"use client";
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function WorkoutManager({ workout }) {
    const router = useRouter()

    // Add or remove sets
    const [setsCount, setSetsCount] = useState(workout.WorkoutPlanExercise.map(e => e.sets));

    const addSet = (index, exerciseName) => {
        const newSetsCount = [...setsCount];
        newSetsCount[index]++;
        setSetsCount(newSetsCount);
        toast.success(`Set added to ${exerciseName}`);
    };

    const removeSet = (index, exerciseName) => {
        const newSetsCount = [...setsCount];
        const newCompletionStatus = [...completionStatus];
        
        if (newSetsCount[index] > 1) {
            newSetsCount[index]--;
            newCompletionStatus[index].pop();
            setSetsCount(newSetsCount);
            setCompletionStatus(newCompletionStatus);
            toast.success(`Set removed from ${exerciseName}`);
        }
    };

    // Set Completed Status
    const [completionStatus, setCompletionStatus] = useState(
        workout.WorkoutPlanExercise.map(exercise => Array(exercise.sets).fill(false))
    );

    const handleCompletion = (exerciseIndex, setIndex, exerciseName) => {
        const newCompletionStatus = [...completionStatus];
        const currentState = newCompletionStatus[exerciseIndex][setIndex];
        newCompletionStatus[exerciseIndex][setIndex] = !currentState;
        setCompletionStatus(newCompletionStatus);
        
        if (! currentState) {
            toast.success(`${exerciseName} Set ${setIndex + 1} completed`);
        }
    };

    const workoutName = workout.name;
    const weightRefs = useRef([]);
    const repsRefs = useRef([]);

    // Save Workout
    const completeWorkout = async () => {
        const workoutPlanId = workout.id;
        const exercises = workout.WorkoutPlanExercise.map((exerciseDetail, index) => {
          return {
            exerciseId: exerciseDetail.Exercise.id,
            name: exerciseDetail.Exercise.name,
            sets: setsCount[index],
            reps: Array.from({ length: setsCount[index] }).map((_, setIndex) => repsRefs.current[index * setsCount.length + setIndex]?.value || exerciseDetail.reps),
            weight: Array.from({ length: setsCount[index] }).map((_, setIndex) => weightRefs.current[index * setsCount.length + setIndex]?.value || 40),
            completed: completionStatus[index]
          };
        });
      
        try {
          const response = await fetch('/api/workouts/', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: workoutName,
              date: new Date().toISOString(),
              workoutPlanId,
              exercises
            })
          });
        
          const responseData = await response.json();
        
          if (response.ok) {
            toast.success('Workout saved successfully!');
            router.push("/dashboard");
          } else {
            toast.error('Failed to save workout. ' + responseData.message);
          }
        } catch (error) {
          toast.error('An error occurred while saving the workout: ' + error.message);
        }
      };
      

    // Return
    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Workout</button>
            {workout.notes && <p>{workout.notes}</p>}
            {workout.WorkoutPlanExercise.map((exerciseDetail, index) => (
                <div key={index} className='my-10'>
                    <h3 className="text-semibold text-2xl">{exerciseDetail.Exercise.name}</h3>
                    <table className="min-w-full table-auto mb-3">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">SET</th>
                                <th className="px-4 py-2">KG</th>
                                <th className="px-4 py-2">REPS</th>
                                <th className="px-4 py-2">COMPLETE</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: setsCount[index] }).map((_, setIndex) => (
                                <tr key={setIndex}>
                                    <td className="border px-4 py-2">
                                    <input 
                                        type='number' 
                                        defaultValue="40" 
                                        disabled={completionStatus[index][setIndex]} 
                                        ref={el => weightRefs.current[index * setsCount.length + setIndex] = el}
                                    />
                                    </td>
                                    <td className="border px-4 py-2">
                                    <input 
                                        type="number" 
                                        defaultValue={exerciseDetail.reps} 
                                        className="w-full p-1" 
                                        disabled={completionStatus[index][setIndex]} 
                                        ref={el => repsRefs.current[index * setsCount.length + setIndex] = el}
                                    />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input 
                                            type="number" 
                                            defaultValue={exerciseDetail.reps} 
                                            className="w-full p-1" 
                                            disabled={completionStatus[index][setIndex]} 
                                        />
                                    </td>
                                    <td className='border px-4 py-2'>
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                                            onClick={() => handleCompletion(index, setIndex, exerciseDetail.Exercise.name)}
                                        >
                                        {completionStatus[index][setIndex] ? "Completed" : "Mark as Completed"}
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => addSet(index, exerciseDetail.Exercise.name)}>Add Set</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => removeSet(index, exerciseDetail.Exercise.name)}>Remove Set</button>
                </div>
            ))}
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={completeWorkout}
            >Save workout
            </button>
        </>
    );
}
