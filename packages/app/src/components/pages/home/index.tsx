import { FC } from 'react'
import { FormSection } from './components/form'

export const Home: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FormSection />
        </div>
      </div>
    </div>
  )
}
