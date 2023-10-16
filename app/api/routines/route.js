import prisma from '@/db/prisma';

// POST
export async function POST(request) {
    try {
        // Parse the incoming data from the request body
        const data = JSON.parse(await request.text());
        const { routineName, exercises, notes } = data;

        // Validate the received data
        if (!routineName || !Array.isArray(exercises)) {
            return new Response(JSON.stringify({ error: "Invalid data format." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Save the workout plan to the database
        const newWorkoutPlan = await prisma.workoutPlan.create({
            data: {
                name: routineName,
                notes: notes,
                WorkoutPlanExercise: {
                    create: exercises.map((exercise) => ({
                        exerciseId: exercise.id,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        duration: exercise.duration,
                    })),
                },
            },
        });

        // Return the ID of the newly created workout plan
        return new Response(JSON.stringify({ success: true, id: newWorkoutPlan.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        // Handle any errors that may occur
        return new Response(JSON.stringify({ error: "An error occurred saving routine." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
