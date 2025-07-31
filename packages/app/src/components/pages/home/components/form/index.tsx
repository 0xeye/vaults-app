import { useVaultDetails } from '@/hooks/useCore'
import { usePositionValueUSD } from '@/hooks/usePrice'
import { formatCurrency } from '@/utils'
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
  const [vaultAddress, setVaultAddress] = useState<string>(
    '0x028eC7330ff87667b6dfb0D94b954c820195336c',
  )
  const { data: vaultDetails } = useVaultDetails(vaultAddress as `0x${string}` | undefined)

  const valueUSD = usePositionValueUSD(
    vaultDetails?.asset?.address as string,
    vaultDetails?.user.assets,
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="bg-white/10 rounded-2xl p-3">
          {vaultDetails?.name ? (
            <div className="bg-black/20 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-white text-lg font-medium">{vaultDetails.name}</p>
                <p className="text-sm text-white/60 mt-1">{vaultAddress}</p>
                {valueUSD && (
                  <p className="text-sm text-white/60 mt-1">
                    {'User Position: '}
                    {formatCurrency(valueUSD)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setVaultAddress('')}
                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Enter vault address"
                value={vaultAddress}
                onChange={(e) => setVaultAddress(e.target.value)}
                className="w-full px-4 py-3 pr-10 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#F6FC3B]/50 focus:border-[#F6FC3B]/50 outline-none transition-all text-white placeholder:text-white/40"
              />
              {!!vaultAddress && (
                <button
                  type="button"
                  onClick={() => setVaultAddress('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
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
              <FormDeposit vaultAddress={vaultAddress as `0x${string}` | undefined} />
            ) : (
              <FormWithdraw vaultAddress={vaultAddress as `0x${string}` | undefined} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
