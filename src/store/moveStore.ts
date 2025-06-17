import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Move } from '@/types/bjj'
import { moves as initialMoves } from '@/data/moves'
import { nanoid } from 'nanoid'

interface MoveState {
  moves: Move[]
  addMove: (move: Omit<Move, 'id' | 'tags'> & { tags: string[] }) => void
  updateMove: (move: Move) => void
  deleteMove: (id: string) => void
  getMoveById: (id: string) => Move | undefined
}

export const useMoveStore = create<MoveState>()(
  persist(
    (set, get) => ({
      moves: initialMoves,
      addMove: (move) =>
        set((state) => ({
          moves: [
            ...state.moves,
            { ...move, id: nanoid(), tags: move.tags as any },
          ],
        })),
      updateMove: (updatedMove) =>
        set((state) => ({
          moves: state.moves.map((move) =>
            move.id === updatedMove.id ? updatedMove : move,
          ),
        })),
      deleteMove: (id) =>
        set((state) => ({
          moves: state.moves.filter((move) => move.id !== id),
        })),
      getMoveById: (id: string) => {
        return get().moves.find((move) => move.id === id)
      },
    }),
    {
      name: 'bjj-notes-storage', // name of the item in the storage (must be unique)
    },
  ),
)
