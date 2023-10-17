import { ChangeEvent, FC } from 'react';
import { Exercise } from '@/types';

type ExerciseTableProps = {
    selectedExercises: Exercise[];
    updateExercise: (index: number, field: 'sets' | 'reps', value: string) => void;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
};

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown }) => {
    return (
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateExercise(index, 'sets', e.target.value)} 
                            />
                        </td>
                        <td>
                            <input 
                                type="number" 
                                value={exercise.reps} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateExercise(index, 'reps', e.target.value)} 
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
    );
}

export default ExerciseTable;
