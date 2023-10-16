"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function NewRoutineTable() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [routineName, setRoutineName] = useState('');
    const [notes, setNotes] = useState('');


    const handleSearch = async () => {
        const response = await fetch(`/api/exercises/search?q=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
    };

    const addExerciseToRoutine = (exercise) => {
        setSelectedExercises([...selectedExercises, {
            ...exercise,
            sets: 8,
            reps: 3,
        }]);
    };

    const updateExercise = (index, field, value) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index][field] = value;
        setSelectedExercises(updatedExercises);
    };

    const moveUp = (index) => {
        if (index === 0) return;
        const updatedExercises = [...selectedExercises];
        const temp = updatedExercises[index - 1];
        updatedExercises[index - 1] = updatedExercises[index];
        updatedExercises[index] = temp;
        setSelectedExercises(updatedExercises);
    };

    const moveDown = (index) => {
        if (index === selectedExercises.length - 1) return;
        const updatedExercises = [...selectedExercises];
        const temp = updatedExercises[index + 1];
        updatedExercises[index + 1] = updatedExercises[index];
        updatedExercises[index] = temp;
        setSelectedExercises(updatedExercises);
    };

    const validateForm = () => {
        if (!routineName.trim()) {
            toast.error('Routine Name is required.');
            return false;
        }
    
        if (selectedExercises.length === 0) {
            toast.error('At least one exercise is required.');
            return false;
        }
    
        for (let exercise of selectedExercises) {
            if (exercise.sets < 1 || exercise.reps < 1) { 
                toast.error(`${exercise.name} should have at least 1 set and 1 rep.`);
                return false;
            }
        }
    
        return true;
    };
    

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }
        const exercisesWithOrder = selectedExercises.map((exercise, index) => ({
            ...exercise,
            order: index + 1
        }));
    
        const response = await fetch('/api/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ routineName, exercises: exercisesWithOrder, notes }),
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
<div className="space-y-4">
    <div>
    <input 
    name='routineName' 
    placeholder='Routine Name' 
    value={routineName} 
    onChange={(e) => setRoutineName(e.target.value)}
/>

<textarea 
    name='routineNotes' 
    placeholder='Notes' 
    value={notes} 
    onChange={(e) => setNotes(e.target.value)}
/>

    </div>
    <div className="flex items-center space-x-2">
        <input
            type="search"
            name="search"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 w-full"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Search
        </button>
    </div>

    {searchResults.length > 0 && (
        <div className="space-y-2">
            <h3 className="text-xl font-semibold">Search Results:</h3>
            <ul className="space-y-1">
                {searchResults.map(exercise => (
                    <li key={exercise.id} className="flex items-center justify-between">
                        {exercise.name}
                        <button onClick={() => addExerciseToRoutine(exercise)} className="px-3 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )}

    <table>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Actions</th>
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
                            <td>
                                <button onClick={() => moveUp(index)}>Up</button>
                                <button onClick={() => moveDown(index)}>Down</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
    <button onClick={handleSave} className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
        Save Routine
    </button>
</div>

    );
}
