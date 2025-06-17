'use client'

import { useMoveStore } from '@/store/moveStore'
import { MoveCard } from '@/components/MoveCard/MoveCard'
import Link from 'next/link'
import { Button } from '@/components/Button/Button'
import { useHydration } from '@/hooks/useHydration'

export default function Home() {
  const moves = useMoveStore((state) => state.moves)
  const hydrated = useHydration()

  if (!hydrated) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            BJJ Notes
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            Your personal knowledge base for Brazilian Jiu-Jitsu techniques.
          </p>
          <div className="mb-12 flex justify-center gap-4">
            <Link href="/mind-map">
              <Button variant="secondary">View Mind Map</Button>
            </Link>
            <Link href="/moves/new">
              <Button variant="primary">Add New Move</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {moves.map((move) => (
            <MoveCard key={move.id} move={move} />
          ))}
        </div>
      </div>
    </main>
  )
}
