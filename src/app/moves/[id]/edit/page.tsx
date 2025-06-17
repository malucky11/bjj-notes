'use client'

import { MoveForm } from '@/components/MoveForm/MoveForm'
import { useMoveStore } from '@/store/moveStore'
import { notFound } from 'next/navigation'
import { use } from 'react'

interface EditMovePageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditMovePage({ params }: EditMovePageProps) {
  const { id } = use(params)
  const getMoveById = useMoveStore((state) => state.getMoveById)
  const move = getMoveById(id)

  if (!move) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            Edit: {move.name}
          </h1>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <MoveForm move={move} />
          </div>
        </div>
      </div>
    </main>
  )
}
