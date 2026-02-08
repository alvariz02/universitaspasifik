import { Suspense } from 'react'
import CreateEventClient from './client'

export default function CreateEventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEventClient />
    </Suspense>
  )
}
