"use client";
import { useState, useEffect } from 'react';
import { useStopwatch } from '@/contexts/WorkoutContext';

export default function WorkoutManager({ workout }) {
    const { start, setWorkoutName } = useStopwatch();

    useEffect(() => {
        setWorkoutName(workout.name);
      }, [workout, setWorkoutName]);

    const [setsCount, setSetsCount] = useState(workout.WorkoutPlanExercise.map(e => e.sets));

    const addSet = (index) => {
        const newSetsCount = [...setsCount];
        newSetsCount[index]++;
        setSetsCount(newSetsCount);
    };

    const removeSet = (index) => {
        const newSetsCount = [...setsCount];
        if (newSetsCount[index] > 1) {
            newSetsCount[index]--;
            setSetsCount(newSetsCount);
        }
    };

    return (
        <>
            <button onClick={start}>Start Workout</button>
            {workout.notes && <p>{workout.notes}</p>}

            {workout.WorkoutPlanExercise.map((exerciseDetail, index) => (
                <div key={index} className='my-10'>
                    <h3 className="text-semibold text-2xl">{exerciseDetail.Exercise.name}</h3>
                    <table className="min-w-full table-auto">
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
                                    <td className="border px-4 py-2">{setIndex + 1}</td>
                                    <td className="border px-4 py-2"><input type='number' defaultValue="40" /></td>
                                    <td className="border px-4 py-2"><input type="number" defaultValue={exerciseDetail.reps} className="w-full p-1" /></td>
                                    <td className='border px-4 py-2'><button>Completed</button> Yes/No</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <button onClick={() => addSet(index)}>Add Set</button>
                    <button onClick={() => removeSet(index)}>Remove Set</button>
                </div>
            ))}
            <button>Save workout</button>
        </>
    );
}
