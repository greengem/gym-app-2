import PageHeading from '@/components/PageHeading/PageHeading'

async function getRoutines(){
  const res = await fetch(`http://localhost:3000/api/routines`, { cache: 'no-store' })
  const routines = await res.json()

  return routines
}

export default async function WorkoutPage() {
  const routines = await getRoutines()

  return (
    <>
    <PageHeading pageTitle="Start Workout" />
    <ul>
      {routines.map((routine) => (
        <li key={routine.id}>{routine.name}</li>
      ))}
    </ul>
    </>
  )
}
