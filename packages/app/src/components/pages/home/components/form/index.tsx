import { type FC, useState } from 'react'
import { FormDeposit } from './FormDeposit'
import { FormWithdraw } from './FormWithdraw'
import { useVaultDetails } from '@/hooks/useCore'

const Button: FC<{
  children: React.ReactNode
  onClick: () => void
  isActive: boolean
}> = ({ children, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-[10px] font-semibold text-base transition-all duration-200 cursor-pointer ${isActive ? 'bg-white text-black shadow-sm' : 'bg-transparent text-white/80 hover:text-white'}`}
    >
      {children}
    </button>
  )
}

export const FormSection: FC = () => {
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit')
  const [vaultAddress, setVaultAddress] = useState<`0x${string}` | undefined>(
    '0x028eC7330ff87667b6dfb0D94b954c820195336c',
  )
  const { data: vaultDetails } = useVaultDetails(vaultAddress)

  return (
    <>
      <div className="bg-white/10 rounded-2xl p-3 flex">
        <input
          type="text"
          placeholder="Enter vault address"
          value={vaultAddress}
          onChange={(e) => setVaultAddress(e.target.value as `0x${string}`)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        {!!vaultAddress && (
          <div className="flex justify-end mt-2 mx-8">
            <button
              type="button"
              onClick={() => setVaultAddress(undefined)}
              className="text-white/60 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      {vaultDetails && (
        <div className="bg-white/10 rounded-2xl p-3">
          <div className="space-y-2 text-white/80">
            <div className="flex justify-between">
              <span>Asset Symbol:</span>
              <span className="font-mono">{vaultDetails.asset?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span>Asset Address:</span>
              <span className="font-mono">{vaultDetails.asset?.address}</span>
            </div>
            <div className="flex justify-between">
              <span>Asset Decimals:</span>
              <span className="font-mono">{vaultDetails.asset?.decimals}</span>
            </div>
            <div className="flex justify-between">
              <span>Vault Address:</span>
              <span className="font-mono">{vaultDetails.address}</span>
            </div>
            <div className="flex justify-between">
              <span>User Assets:</span>
              <span className="font-mono">{vaultDetails.user?.assets?.toString()}</span>
            </div>
            <div className="flex justify-between">
              <span>User Shares:</span>
              <span className="font-mono">{vaultDetails.user?.shares?.toString()}</span>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white/10 rounded-2xl p-3">
        <div className="bg-black/15 p-0.5 rounded-xl flex gap-1 mb-2">
          <Button onClick={() => setMode('deposit')} isActive={mode === 'deposit'}>
            Deposit
          </Button>
          <Button onClick={() => setMode('withdraw')} isActive={mode === 'withdraw'}>
            Withdraw
          </Button>
        </div>
        <div className="bg-white rounded-xl p-2">
          {mode === 'deposit' ? (
            <FormDeposit vaultAddress={vaultAddress} />
          ) : (
            <FormWithdraw vaultAddress={vaultAddress} />
          )}
        </div>
      </div>
    </>
  )
}
