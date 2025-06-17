import { MoveForm } from '@/components/MoveForm/MoveForm'

export default function NewMovePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            Add a New Move
          </h1>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <MoveForm />
          </div>
        </div>
      </div>
    </main>
  )
}
