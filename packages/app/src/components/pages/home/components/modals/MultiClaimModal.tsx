import { TxButton } from '@/components/shared/TxButton'
import { queryClient } from '@/context/queryClient'
import { useUserPositions } from '../../../../../hooks/useCore'
import { queryHelpers } from '@/utils/queryKeys'
import { multiClaimerAddress, usePrepareYieldSplitterSetClaimForSelf } from '@ysplitter/contracts'
import { katana } from '@ysplitter/sdk'
import { TPosition } from '@ysplitter/sdk'
import _ from 'lodash'
import { type FC } from 'react'
import { UseSimulateContractReturnType, useAccount, useChainId } from 'wagmi'

interface MultiClaimModalProps {
  isOpen: boolean
  onClose: () => void
}

export const MultiClaimModal: FC<MultiClaimModalProps> = ({ isOpen, onClose }) => {
  const { data: positions } = useUserPositions()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Positions</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {_.values(positions).map((position, index) => (
              <MultiClaimRow key={index} position={position} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MultiClaimRow: FC<{
  position: TPosition
}> = ({ position: { isMultiClaimEnabled, ...position } }) => {
  const { address } = useAccount()
  const chainId = useChainId()
  // Prepare SetClaimForSelf transaction
  const prepareSetClaimForSelf: UseSimulateContractReturnType =
    usePrepareYieldSplitterSetClaimForSelf({
      address: position.splitter,
      args: [multiClaimerAddress[katana.id] as `0x${string}`],
      query: { enabled: !isMultiClaimEnabled },
    })

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {position.vault.name} ({position.want.symbol})
          </h3>
        </div>

        <div className="ml-4">
          {isMultiClaimEnabled ? (
            <div className="flex items-center gap-2 text-green-600">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Enabled</span>
            </div>
          ) : (
            <TxButton
              prepareWrite={prepareSetClaimForSelf}
              transactionName="Enable Multi-Claim"
              onSuccess={() => {
                queryHelpers.invalidatePositions(queryClient, address, chainId)
              }}
              className="!px-3 !py-1 text-sm"
              style={{
                backgroundColor: '#401BE4',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '14px',
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
