import PageHeading from '@/components/PageHeading/PageHeading'

async function getexercises(){
  const res = await fetch(`${process.env.SERVER_PATH}/api/exercises`, { cache: 'no-store' })
  const exercises = await res.json()

  return exercises
}

export default async function ExercisesPage() {
  const exercises = await getexercises()

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
