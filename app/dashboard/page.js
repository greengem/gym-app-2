import PageHeading from '@/components/PageHeading/PageHeading'

async function getWorkouts(){
  const res = await fetch(`http://localhost:3000/api/workouts`, { cache: 'no-store' })
  const workouts = await res.json()

  return workouts
}

export default async function DashboardPage() {
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