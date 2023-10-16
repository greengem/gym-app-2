import PageHeading from '@/components/PageHeading/PageHeading'
import Link from 'next/link'

export default async function RoutinesPage() {
  return (
    <>
    <PageHeading pageTitle="Create New Routine" />
    <div>
      <input 
        type='text' 
        name='routineName'
        placeholder='Routine Name'
      />
      <input 
        type='text' 
        name='routineNotes'
        placeholder='Notes'
      />
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bench Press</td>
            <td>8</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Deadlift</td>
            <td>8</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
      <button>Submit</button>
    </div>

    </>
  )
}
