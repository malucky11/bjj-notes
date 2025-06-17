'use client'

import { useMoveStore } from '@/store/moveStore'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { Button } from '@/components/Button/Button'
import { useHydration } from '@/hooks/useHydration'
import { use } from 'react'

interface MovePageProps {
  params: Promise<{
    id: string
  }>
}

const YoutubeEmbed = ({ url, title }: { url: string; title: string }) => {
  const videoId = url.split('v=')[1]
  const embedUrl = `https://www.youtube.com/embed/${videoId}`
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full rounded-lg"
      ></iframe>
    </div>
  )
}

export default function MovePage({ params }: MovePageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { getMoveById, deleteMove, moves } = useMoveStore()
  const hydrated = useHydration()

  if (!hydrated) {
    return null
  }

  const move = getMoveById(id)

  if (!move) {
    notFound()
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this move?')) {
      deleteMove(id)
      router.push('/')
    }
  }

  const relatedMoves = moves.filter((m) => move.relatedMoveIds?.includes(m.id))

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="mb-8 inline-block text-blue-600 hover:underline"
          >
            &larr; Back to all moves
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                {move.name}
              </h1>
              <div className="mb-6 flex flex-wrap gap-2">
                {move.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <Link href={`/moves/${move.id}/edit`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>{move.description}</p>
            {move.notes && (
              <>
                <h2 className="mt-8">Notes</h2>
                <p>{move.notes}</p>
              </>
            )}
          </div>

          {move.videos && move.videos.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Videos</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {move.videos.map((video) => (
                  <YoutubeEmbed
                    key={video.url}
                    url={video.url}
                    title={video.title}
                  />
                ))}
              </div>
            </div>
          )}

          {relatedMoves.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Related Moves
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {relatedMoves.map((relatedMove) => (
                  <Link href={`/moves/${relatedMove.id}`} key={relatedMove.id}>
                    <div className="block h-full rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md">
                      <h4 className="font-semibold text-blue-700">
                        {relatedMove.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
