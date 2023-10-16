import PageHeading from '@/components/PageHeading/PageHeading'
import Link from 'next/link'

export default async function RoutinesPage() {
  return (
    <>
    <PageHeading pageTitle="Create New Routine" />
    <Link href="/routines">Back</Link>

    </>
  )
}
