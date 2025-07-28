import { SuccessModal } from '../modals/SuccessModal'
import { InputTokenAmount } from '@/components/shared/InputTokenAmount'
import { QuickStackInput } from '@/components/shared/QuickStackInput'
import { TxButton } from '@/components/shared/TxButton'
import { queryClient } from '@/context/queryClient'
import { useVaultDetails } from '@/hooks/useCore'
import { useInput } from '@/hooks/useInput'
import { useTokenAllowance } from '@/hooks/useTokenAllowance'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import { queryHelpers } from '@/utils/queryKeys'
import { usePrepareErc20Approve, usePrepareErc4626Deposit } from '@vaults4626/contracts'

import type { FC } from 'react'
import { useState } from 'react'
import { Address } from 'viem'
import { type UseSimulateContractReturnType, useAccount, useChainId } from 'wagmi'

export const FormDeposit: FC<{ vaultAddress?: `0x${string}` }> = ({ vaultAddress }) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const { data: vaultDetails } = useVaultDetails(vaultAddress)

  // Modal states
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // ** PERIPHERY ** //
  const input = useInput(vaultDetails?.asset?.decimals ?? 18)
  const [amount] = input

  const { balance: assetBalance } = useTokenBalance({
    token: vaultDetails?.asset?.address as Address,
  })

  const { allowance: depositAllowance = 0n } = useTokenAllowance({
    token: vaultDetails?.asset?.address as Address,
    spender: vaultDetails?.address as Address,
    watch: true,
  })

  const isValidInput = amount.bn > 0n
  const isDepositAllowanceSufficient = Boolean(depositAllowance >= amount.bn)
  const prepareApproveEnabled = Boolean(!isDepositAllowanceSufficient && isValidInput)
  const prepareDepositEnabled = Boolean(isDepositAllowanceSufficient && isValidInput)

  const handleDepositSuccess = () => {
    queryHelpers.invalidateVaultDetails(queryClient, chainId, vaultAddress)
    setIsSuccessModalOpen(true)
  }

  // ** ACTIONS ** //
  const prepareApprove: UseSimulateContractReturnType = usePrepareErc20Approve({
    address: vaultDetails?.asset?.address,
    args: amount.bn > 0n && vaultDetails?.address ? [vaultDetails?.address, amount.bn] : undefined,
    query: { enabled: prepareApproveEnabled },
  })

  const prepareDeposit: UseSimulateContractReturnType = usePrepareErc4626Deposit({
    address: vaultDetails?.address,
    args: address && amount.bn > 0n ? [amount.bn, address] : undefined,
    query: { enabled: prepareDepositEnabled },
  })

  return (
    <div className="space-y-3">
      {/* Amount Section */}
      <InputTokenAmount
        title="Amount to Deposit"
        input={input}
        placeholder="0.00"
        className="flex-1"
        symbol={vaultDetails?.asset?.symbol}
        balance={vaultDetails?.user?.assets}
      />

      <QuickStackInput
        balance={assetBalance}
        decimals={input[0].decimals}
        onInputChange={input[2]}
      />

      {/* Action Button */}
      <div className="flex gap-1">
        <TxButton
          prepareWrite={prepareApprove}
          transactionName="Approve"
          disabled={!prepareApproveEnabled}
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
        <TxButton
          prepareWrite={prepareDeposit}
          transactionName={`Deposit ${vaultDetails?.asset?.symbol || ''}`}
          disabled={!prepareDepositEnabled}
          onSuccess={handleDepositSuccess}
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
      </div>

      {/* Modals */}
      <SuccessModal open={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
    </div>
  )
}
