'use client'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { moveSchema, MoveFormData, TAGS, Move } from '@/types/bjj'
import { useMoveStore } from '@/store/moveStore'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button/Button'

interface MoveFormProps {
  move?: Move
}

export const MoveForm = ({ move }: MoveFormProps) => {
  const router = useRouter()
  const { addMove, updateMove, moves } = useMoveStore()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MoveFormData>({
    resolver: zodResolver(moveSchema),
    defaultValues: move
      ? { ...move }
      : {
          name: '',
          description: '',
          tags: [],
          notes: '',
          videos: [],
          relatedMoveIds: [],
        },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'videos',
  })

  const onSubmit = (data: MoveFormData) => {
    if (move) {
      updateMove({ id: move.id, ...data })
    } else {
      addMove(data)
    }
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          {...register('name')}
          id="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {TAGS.map((tag) => (
            <div key={tag} className="flex items-center">
              <input
                {...register('tags')}
                type="checkbox"
                id={tag}
                value={tag}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor={tag} className="ml-3 text-sm text-gray-700">
                {tag}
              </label>
            </div>
          ))}
        </div>
        {errors.tags && (
          <p className="mt-2 text-sm text-red-600">{errors.tags.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          {...register('notes')}
          id="notes"
          rows={5}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Videos</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="mt-4 space-y-4 rounded-md border border-gray-200 p-4"
          >
            <input
              {...register(`videos.${index}.title`)}
              placeholder="Video Title"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              {...register(`videos.${index}.url`)}
              placeholder="https://youtube.com/watch?v=..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => remove(index)}
            >
              Remove Video
            </Button>
          </div>
        ))}
        {errors.videos && (
          <p className="mt-2 text-sm text-red-600">
            Please check video fields.
          </p>
        )}
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => append({ title: '', url: '' })}
        >
          Add Video
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Related Moves
        </label>
        <Controller
          name="relatedMoveIds"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              multiple
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {moves
                .filter((m) => m.id !== move?.id)
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
            </select>
          )}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          {move ? 'Update Move' : 'Create Move'}
        </Button>
      </div>
    </form>
  )
}
