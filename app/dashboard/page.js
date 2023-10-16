import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading'

async function getWorkouts(){
  const workouts = await prisma.workoutLog.findMany();
  return workouts;
}

export default async function WorkoutsPage() {
  const workouts = await getWorkouts()

  return (
    <>
      <PageHeading pageTitle="Dashboard" />
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>{workout.name}</li>
        ))}
      </ul>
    </>
  )
}

