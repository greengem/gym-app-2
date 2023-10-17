import prisma from "@/db/prisma";
import PageHeading from '@/components/PageHeading/PageHeading';
import WorkoutManager from './WorkoutManager';

async function fetchRoutine(id) {
    return await prisma.workoutPlan.findUnique({
        where: {
          id: id,
        },
        select: {
            id: true,
            name: true,
            notes: true,
            WorkoutPlanExercise: {
              select: {
                Exercise: {
                  select: {
                    id: true,
                    name: true,
                  }
                },
                sets: true,
                reps: true,
                duration: true,
                order: true,
              }
            },
          }
    });
}

export default async function StartWorkout({ params }) {
    const workout = await fetchRoutine(params.id);
    return (
        <>
            <PageHeading pageTitle={`Workout: ${workout.name}`} />
            <WorkoutManager workout={workout}  />
        </>
    )
}