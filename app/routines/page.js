import PageHeading from '@/components/PageHeading/PageHeading'
import Link from 'next/link'

async function getRoutines(){
  const res = await fetch(`${process.env.SERVER_PATH}/api/routines`, { cache: 'no-store' })
  const routines = await res.json()

  return routines
}

export default async function RoutinesPage() {
  const routines = await getRoutines()

  return (
    <>
    <PageHeading pageTitle="Routines" />
    <Link href="/routines/new">Create New Routine</Link>
    <ul>
      {routines.map((routine) => (
        <li key={routine.id}>{routine.name}</li>
      ))}
    </ul>
    </>
  )
}
