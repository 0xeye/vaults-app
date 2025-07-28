import { type FC, useState } from 'react'
import { FormDeposit } from './FormDeposit'
import { FormWithdraw } from './FormWithdraw'

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
  return (
    <div className="bg-white/10 rounded-2xl p-3">
      <input
        type="text"
        placeholder="Search vaults by name, symbol, or address"
        value={vaultAddress}
        onChange={(e) => setVaultAddress(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
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
  )
}
