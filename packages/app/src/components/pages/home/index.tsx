import { FC } from 'react'
import { FormSection } from './components/form'

export const Home: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <FormSection />
      </div>
    </div>
  )
}
