"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function NewRoutineTable() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`/api/exercises/search?q=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
    };

    const addExerciseToRoutine = (exercise) => {
        setSelectedExercises([...selectedExercises, {
            ...exercise,
            sets: 8, // default value
            reps: 3, // default value
        }]);
    };

    const updateExercise = (index, field, value) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index][field] = value;
        setSelectedExercises(updatedExercises);
    };

    const handleSave = async () => {
        const routineName = "Sample Routine"; // Should fetch from NewRoutineName component or a shared state
        const notes = "Sample Notes"; // Should fetch from NewRoutineNotes component or a shared state
        const exercises = selectedExercises;

        const response = await fetch('/api/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ routineName, exercises, notes }),
        });
        

        const data = await response.json();
        if (data.success) {
            toast.success('Routine saved successfully!');
            router.push('/routines')
        } else {
            console.error("Server responded with error:", data.error);
            toast.error('Error saving routine.');
        }
        
    };

    return (
        <div>
            {/* Search logic */}
            <input
                type="search"
                name="search"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {/* Search results */}
            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map(exercise => (
                            <li key={exercise.id}>
                                {exercise.name}
                                <button onClick={() => addExerciseToRoutine(exercise)}>Add</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Table of selected exercises */}
            <table>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedExercises.map((exercise, index) => (
                        <tr key={index}>
                            <td>{exercise.name}</td>
                            <td>
                                <input 
                                    type="number" 
                                    value={exercise.sets} 
                                    onChange={(e) => updateExercise(index, 'sets', e.target.value)} 
                                />
                            </td>
                            <td>
                                <input 
                                    type="number" 
                                    value={exercise.reps} 
                                    onChange={(e) => updateExercise(index, 'reps', e.target.value)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Save button */}
            <button onClick={handleSave}>Save Routine</button>
        </div>
    );
}
