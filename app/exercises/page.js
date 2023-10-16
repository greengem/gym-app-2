import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading'

async function getExercises(){
  const exercises = await prisma.exercise.findMany();
  return exercises;
}

export default async function ExercisesPage() {
  const exercises = await getExercises()

  return (
    <>
      <PageHeading pageTitle="Exercises" />
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </>
  )
}
