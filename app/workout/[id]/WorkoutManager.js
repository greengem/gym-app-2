"use client";
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function WorkoutManager({ workout }) {
    const router = useRouter();

    // Unified exercises state
    const [exercises, setExercises] = useState(workout.WorkoutPlanExercise.map(exercise => ({
        sets: exercise.sets,
        completedSets: Array(exercise.sets).fill(false),
    })));

    const addSet = (index, exerciseName) => {
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            updatedExercises[index].sets++;
            updatedExercises[index].completedSets.push(false);
            return updatedExercises;
        });
        toast.success(`Set added to ${exerciseName}`);
    };

    const removeSet = (index, exerciseName) => {
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            if (updatedExercises[index].sets > 1) {
                updatedExercises[index].sets--;
                updatedExercises[index].completedSets.pop();
                return updatedExercises;
            }
            return prevExercises;
        });
        toast.success(`Set removed from ${exerciseName}`);
    };

    const handleCompletion = (exerciseIndex, setIndex, exerciseName) => {
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            const currentState = updatedExercises[exerciseIndex].completedSets[setIndex];
            updatedExercises[exerciseIndex].completedSets[setIndex] = !currentState;
            if (!currentState) {
                toast.success(`${exerciseName} Set ${setIndex + 1} completed`);
            }
            return updatedExercises;
        });
    };

    const workoutName = workout.name;
    const weightRefs = useRef([]);
    const repsRefs = useRef([]);

    // Save Workout
    const completeWorkout = async () => {
        const workoutPlanId = workout.id;
        const workoutExercises = exercises.map((exerciseState, index) => {
            const exerciseDetail = workout.WorkoutPlanExercise[index];
            return {
                exerciseId: exerciseDetail.Exercise.id,
                name: exerciseDetail.Exercise.name,
                sets: exerciseState.sets,
                reps: Array.from({ length: exerciseState.sets }).map((_, setIndex) => 
                    repsRefs.current[index * exerciseState.sets + setIndex]?.value || exerciseDetail.reps
                ),
                weight: Array.from({ length: exerciseState.sets }).map((_, setIndex) => 
                    weightRefs.current[index * exerciseState.sets + setIndex]?.value || 40
                ),
                completed: exerciseState.completedSets
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
                    exercises: workoutExercises
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

    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Workout</button>
            {workout.notes && <p>{workout.notes}</p>}
            {workout.WorkoutPlanExercise.map((exerciseDetail, index) => (
                <div key={exerciseDetail.Exercise.id} className='my-10'>
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
                            {Array.from({ length: exercises[index].sets }).map((_, setIndex) => (
                                <tr key={setIndex}>
                                    <td className="border px-4 py-2">
                                        {setIndex + 1}
                                    </td>
                                    <td className="border px-4 py-2">
                                    <input 
                                        type='number' 
                                        defaultValue="40" 
                                        disabled={exercises[index].completedSets[setIndex]} 
                                        ref={el => weightRefs.current[index * exercises[index].sets + setIndex] = el}
                                    />
                                    </td>
                                    <td className="border px-4 py-2">
                                    <input 
                                        type="number" 
                                        defaultValue={exerciseDetail.reps} 
                                        className="w-full p-1" 
                                        disabled={exercises[index].completedSets[setIndex]} 
                                        ref={el => repsRefs.current[index * exercises[index].sets + setIndex] = el}
                                    />
                                    </td>
                                    <td className='border px-4 py-2'>
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                                            onClick={() => handleCompletion(index, setIndex, exerciseDetail.Exercise.name)}
                                        >
                                        {exercises[index].completedSets[setIndex] ? "Completed" : "Mark as Completed"}
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={() => addSet(index, exerciseDetail.Exercise.name)}>Add Set</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={() => removeSet(index, exerciseDetail.Exercise.name)}>Remove Set</button>
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
