import { Move } from '@/types/bjj'

export const moves: Move[] = [
  {
    id: 'triangle-choke',
    name: 'Triangle Choke',
    description:
      "A chokehold that forms a triangle shape with the legs around the opponent's head and one arm.",
    tags: ['Submission', 'Guard', 'Choke'],
    notes:
      'The key is to control posture and use your hamstrings to finish. Hips up is crucial.',
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Fundamental Triangle Choke Details',
      },
    ],
    relatedMoveIds: ['armbar-from-guard', 'omoplata'],
  },
  {
    id: 'armbar-from-guard',
    name: 'Armbar from Guard',
    description:
      'A joint lock that hyperextends the elbow, typically applied from the guard position.',
    tags: ['Submission', 'Guard', 'Joint Lock'],
    notes: 'Pinch your knees, control the wrist, and lift your hips.',
    videos: [
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Mastering the Armbar from Guard',
      },
    ],
    relatedMoveIds: ['triangle-choke', 'omoplata'],
  },
  {
    id: 'kneecut-pass',
    name: 'Kneecut Pass',
    description:
      "A common guard pass where you slice your knee across the opponent's thigh.",
    tags: ['Pass', 'Position'],
    notes:
      'Control the head and the far-side arm. A strong cross-face is essential for this pass to be effective.',
    relatedMoveIds: ['side-control', 'mount'],
  },
]
