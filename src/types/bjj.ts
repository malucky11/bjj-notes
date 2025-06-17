import { z } from 'zod'

export const TAGS = [
  'Submission',
  'Guard',
  'Pass',
  'Escape',
  'Takedown',
  'Sweep',
  'Choke',
  'Joint Lock',
  'Position',
] as const

export type Tag = (typeof TAGS)[number]

export const videoSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid YouTube URL.' }),
  title: z.string().min(1, { message: 'Video title is required.' }),
})

export const moveSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Move name must be at least 3 characters.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  tags: z
    .array(z.enum(TAGS))
    .min(1, { message: 'Please select at least one tag.' }),
  notes: z.string().optional(),
  videos: z.array(videoSchema).optional(),
  relatedMoveIds: z.array(z.string()).optional(),
})

export type MoveFormData = z.infer<typeof moveSchema>

export interface Video {
  url: string
  title: string
}

export interface Move extends MoveFormData {
  id: string
}
