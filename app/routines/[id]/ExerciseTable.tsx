import { ChangeEvent, FC } from 'react';
import { Exercise } from '@/types';
import Button from '@/components/Button';

type ExerciseTableProps = {
    selectedExercises: Exercise[];
    updateExercise: (index: number, field: 'sets' | 'reps', value: number) => void;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteExercise: (index: number) => void;
};

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise }) => {
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
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const intValue = parseInt(e.target.value, 10);
                                    if (!isNaN(intValue)) {
                                        updateExercise(index, 'sets', intValue);
                                    }
                                }}

                            />
                        </td>
                        <td>
                            <input 
                                type="number" 
                                value={exercise.reps} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const intValue = parseInt(e.target.value, 10);
                                    if (!isNaN(intValue)) {
                                        updateExercise(index, 'reps', intValue);
                                    }
                                }}

                            />
                        </td>
                        <td>
                            <Button className='mr-2' onClick={() => moveUp(index)}>Up</Button>
                            <Button className='mr-2' onClick={() => moveDown(index)}>Down</Button>
                            <Button onClick={() => deleteExercise(index)}>Remove</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
