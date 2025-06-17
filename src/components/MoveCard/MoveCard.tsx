import { Move } from '@/types/bjj'
import Link from 'next/link'

interface MoveCardProps {
  move: Move
}

export const MoveCard = ({ move }: MoveCardProps) => {
  return (
    <Link href={`/moves/${move.id}`}>
      <div className="block h-full rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{move.name}</h3>
        <p className="mb-4 text-gray-600">{move.description}</p>
        <div className="flex flex-wrap gap-2">
          {move.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
