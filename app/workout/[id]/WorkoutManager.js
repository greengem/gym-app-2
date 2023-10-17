export default function WorkoutManager({ workout }) {
    return (
        <>
            <button>Start Workout</button>
            {workout.notes && <p>{workout.notes}</p>}

            {workout.WorkoutPlanExercise.map((exerciseDetail, index) => (
                <div key={index}>
                    <h3 className="text-semibold text-2xl">{exerciseDetail.Exercise.name}</h3>
                    <table className="min-w-full table-auto mb-7">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Set</th>
                                <th className="px-4 py-2">Reps</th>
                                <th className="px-4 py-2">Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: exerciseDetail.sets }).map((_, setIndex) => (
                                <tr key={setIndex}>
                                    <td className="border px-4 py-2">{setIndex + 1}</td>
                                    <td className="border px-4 py-2">{exerciseDetail.reps}</td>
                                    <td className="border px-4 py-2">{exerciseDetail.order}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
            <button>Save workout</button>
        </>
    );
}
