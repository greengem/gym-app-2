import PageHeading from '@/components/PageHeading/PageHeading'
import NewRoutineName from './Name'
import NewRoutineNotes from './Notes'
import NewRoutineTable from './Table'
import NewRoutineSubmit from './Submit'

export default async function NewRoutinePage() {
  return (
    <>
      <PageHeading pageTitle="Create New Routine" />
      <NewRoutineName />
      <hr />
      <NewRoutineNotes />
      <hr />
      <NewRoutineTable />
      <hr />
      <NewRoutineSubmit />
    </>
  )
}
