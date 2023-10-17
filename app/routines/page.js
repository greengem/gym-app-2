import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading'
import Link from 'next/link';

async function getRoutines(){
  const routines = await prisma.workoutPlan.findMany({
    include: {
        WorkoutPlanExercise: {
            include: {
                Exercise: true
            }
        }
    }
});

  return routines;
}

export default async function RoutinesPage() {
  const routines = await getRoutines()

  return (
    <>
      <PageHeading pageTitle="Routines" />
      <Link href="/routines/new">New Routine</Link>
        {routines.map((routine) => (
          <div key={routine.id}>
            <p className='font-bold'>{routine.name}</p>
            {routine.notes && <p>{routine.notes}</p>}
            {routine.WorkoutPlanExercise.map((exerciseDetail) => (
              <ul key={exerciseDetail.Exercise.id} className='flex'>
                {exerciseDetail.Exercise.name && <li>{exerciseDetail.Exercise.name}</li>}
                {exerciseDetail.sets && <li>{exerciseDetail.sets} Sets</li>}
                {exerciseDetail.reps && <li>{exerciseDetail.reps} Reps</li>}
                {exerciseDetail.duration && <li>{exerciseDetail.duration} Duration</li>}
              </ul>
            ))}
          </div>
        ))}
    </>
  )
}

