import { Suspense } from 'react'
import CreateNewsClient from './client'

export default function CreateNewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewsClient />
    </Suspense>
  )
}
