'use client'

import { useMoveStore } from '@/store/moveStore'
import Link from 'next/link'
import { useHydration } from '@/hooks/useHydration'

export default function MindMapPage() {
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
            Technique Mind Map
          </h1>
          <p className="mb-12 text-lg text-gray-600">
            Visualize the connections between different moves.
          </p>
        </div>

        <div className="relative rounded-lg bg-white p-8 shadow-xl">
          <div className="flex flex-wrap justify-center gap-8">
            {moves.map((move) => (
              <div key={move.id} className="text-center">
                <Link href={`/moves/${move.id}`}>
                  <div className="mb-2 block rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-transform hover:scale-105">
                    <h3 className="font-bold">{move.name}</h3>
                  </div>
                </Link>
                {move.relatedMoveIds && move.relatedMoveIds.length > 0 && (
                  <div className="mt-2 flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-500">Connects to:</p>
                    <div className="flex flex-col gap-2">
                      {moves
                        .filter((m) => move.relatedMoveIds?.includes(m.id))
                        .map((relatedMove) => (
                          <Link
                            href={`/moves/${relatedMove.id}`}
                            key={relatedMove.id}
                          >
                            <div className="block text-sm text-blue-700 hover:underline">
                              {relatedMove.name}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
