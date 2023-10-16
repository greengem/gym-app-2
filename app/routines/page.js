import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading'
import Link from 'next/link';

async function getRoutines(){
  const routines = await prisma.workoutPlan.findMany();
  return routines;
}

export default async function RoutinesPage() {
  const routines = await getRoutines()

  return (
    <>
      <PageHeading pageTitle="Routines" />
      <Link href="/routines/new">New Routine</Link>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>{routine.name}</li>
        ))}
      </ul>
    </>
  )
}

