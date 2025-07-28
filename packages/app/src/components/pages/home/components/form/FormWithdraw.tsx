import { InputTokenAmount } from '@/components/shared/InputTokenAmount'
import { QuickStackInput } from '@/components/shared/QuickStackInput'
import { TxButton } from '@/components/shared/TxButton'
import { useVaultDetails } from '@/hooks/useCore'
import { useInput } from '@/hooks/useInput'
import { queryHelpers } from '@/utils/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import { usePrepareErc4626Withdraw } from '@vaults4626/contracts'
import { type FC, useState } from 'react'
import { zeroAddress } from 'viem'
import { type UseSimulateContractReturnType, useAccount, useChainId } from 'wagmi'
import { SuccessModal } from '../modals/SuccessModal'

export const FormWithdraw: FC<{ vaultAddress?: `0x${string}` }> = ({ vaultAddress }) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const queryClient = useQueryClient()

  // Modal states
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const { data: vaultDetails } = useVaultDetails(vaultAddress)

  const input = useInput(vaultDetails?.asset?.decimals)
  const [amount] = input

  const handleWithdrawSuccess = () => {
    queryHelpers.invalidateVaultDetails(queryClient, chainId, vaultAddress)
    setIsSuccessModalOpen(true)
  }

  // ** ACTIONS ** //
  const prepareWithdraw: UseSimulateContractReturnType = usePrepareErc4626Withdraw({
    address: vaultDetails?.address,
    args: amount.bn > 0n ? [amount.bn, address!, address!, 0n] : undefined,
    query: {
      enabled: Boolean(amount.bn > 0n && vaultDetails?.address !== zeroAddress),
    },
  })

  return (
    <div className="space-y-3">
      {/* Amount Section */}
      <InputTokenAmount
        title="Amount to Withdraw"
        input={input}
        placeholder="0.00"
        className="flex-1"
        symbol={vaultDetails?.asset?.symbol}
        balance={vaultDetails?.user?.assets}
      />
      <QuickStackInput
        balance={vaultDetails?.user?.assets}
        decimals={vaultDetails?.asset?.decimals}
        onInputChange={input[2]}
      />
      <TxButton
        prepareWrite={prepareWithdraw}
        onSuccess={handleWithdrawSuccess}
        transactionName="Withdraw"
        disabled={!prepareWithdraw.data || amount.bn === 0n}
        className="w-full"
        style={{
          backgroundColor: '#401BE4',
          color: 'white',
          padding: '12px',
          borderRadius: '12px',
          fontWeight: 500,
          fontSize: '16px',
        }}
      />
      {/* Modals */}
      <SuccessModal open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />{' '}
    </div>
  )
}
