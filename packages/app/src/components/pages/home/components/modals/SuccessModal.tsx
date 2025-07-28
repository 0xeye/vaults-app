import { Button } from '@/components/shared/Button'
import { Modal } from '@/components/shared/Modal'
import type { FC } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

export const SuccessModal: FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} title="" maxWidth="max-w-sm" hasHeader={false}>
      <div className="p-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Text */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Deposit Success</h3>

        {/* Dismiss Button */}
        <Button
          onClick={onClose}
          className="w-full bg-[#401BE4] text-white hover:bg-[#401BE4]/90 rounded-xl py-3 font-medium transition-colors"
        >
          Dismiss
        </Button>
      </div>
    </Modal>
  )
}
