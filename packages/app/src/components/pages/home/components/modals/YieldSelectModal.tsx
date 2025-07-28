import { Modal } from '@/components/shared/Modal'
import { useInput } from '@/hooks/useInput'
import { useToken } from '@/hooks/useToken'
import { tokenlist } from '@/utils/tokenlist'
import { useErc20BalanceOf } from '@ysplitter/contracts'
import { FC, useMemo } from 'react'
import { Address, formatUnits, isAddress } from 'viem'
import { useAccount } from 'wagmi'

interface TokenOption {
  address: Address
  symbol: string
  decimals: number
  balance?: bigint
}

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (address: Record<Address, { symbol: string; decimals: number }>) => void
  tokens: Record<Address, { symbol: string; decimals: number }>
}

export const YieldSelectModal: FC<Props> = ({ open, onClose, onSelect, tokens }) => {
  const { address } = useAccount()
  const searchInput = useInput(0) // Using 0 decimals for search/address input
  const [, , setSearchQuery] = searchInput
  const searchQuery = searchInput[0].formValue

  // Convert tokens object to array
  const tokenOptions = useMemo(() => {
    return Object.entries(tokens).map(([address, { symbol, decimals }]) => ({
      address: address as Address,
      symbol,
      decimals,
    }))
  }, [tokens])

  // Filter tokens based on search query
  // Check if the input is a valid address
  const isValidAddress = useMemo(() => {
    return searchQuery && isAddress(searchQuery)
  }, [searchQuery])

  // Fetch token data if valid address
  const { token: customToken, isLoading: isLoadingToken } = useToken(
    isValidAddress ? (searchQuery as Address) : undefined,
  )

  // Filter tokens based on search query
  const filteredTokens = useMemo(() => {
    if (!searchQuery) return tokenOptions
    if (isValidAddress) return [] // Don't show list if valid address is entered

    const query = searchQuery.toLowerCase()
    return tokenOptions.filter(
      (token) =>
        token.symbol.toLowerCase().includes(query) || token.address.toLowerCase().includes(query),
    )
  }, [tokenOptions, searchQuery, isValidAddress])

  const handleSelect = (address: Address, symbol: string, decimals: number) => {
    onSelect({
      [address]: { symbol, decimals },
    })
    setSearchQuery('')
    onClose()
  }

  const handleCustomAddressSelect = () => {
    if (isValidAddress && customToken) {
      handleSelect(
        searchQuery as Address,
        customToken.symbol || 'Unknown',
        customToken.decimals || 18,
      )
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={'Select Yield Token'} maxWidth="max-w-md">
      {/* Search Input */}
      <div className="p-6 pb-0">
        <input
          type="text"
          placeholder="Search vaults by name, symbol, or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />

        {/* Disclaimer for custom address */}
        {isValidAddress && (
          <div className="mt-3 space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>⚠️ Custom Address:</strong> You are entering a custom token address. Please
                ensure this is a valid ERC20 token. Using incorrect addresses is at your own risk.
              </p>
            </div>

            {/* Token Info */}
            {isLoadingToken ? (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">Loading token information...</p>
              </div>
            ) : customToken?.symbol ? (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Token Found:</strong>
                  <br />
                  Name: {customToken.name || 'Unknown'}
                  <br />
                  Symbol: {customToken.symbol}
                  <br />
                  Decimals: {customToken.decimals}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Warning:</strong> Unable to fetch token information. This might not be a
                  valid ERC20 token.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Token List */}
      <div className="p-6 pt-4 max-h-[400px] overflow-y-auto">
        <div className="space-y-2">
          {isValidAddress ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Custom address detected</p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCustomAddressSelect}
                  className="bg-[#401BE4] text-white px-6 py-2 rounded-lg hover:bg-[#401BE4]/90 transition-colors"
                  disabled={!customToken?.symbol}
                >
                  Use Custom Address
                </button>
              </div>
            </div>
          ) : filteredTokens.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No tokens found</p>
          ) : (
            filteredTokens.map((token) => (
              <TokenItem
                key={token.address}
                token={token}
                onClick={() => handleSelect(token.address, token.symbol, token.decimals)}
                userAddress={address}
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  )
}

// Token Item Component
const TokenItem: FC<{
  token: TokenOption
  onClick: () => void
  userAddress?: Address
}> = ({ token, onClick, userAddress }) => {
  const imageUri = tokenlist[token.address]

  const { data: balance } = useErc20BalanceOf({
    address: token.address,
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: Boolean(userAddress),
    },
  })

  const formattedBalance = useMemo(() => {
    if (!balance) return '0.00'
    const value = formatUnits(balance, token.decimals)
    const num = Number.parseFloat(value)
    if (num === 0) return '0.00'
    if (num < 0.01) return '<0.01'
    return num.toFixed(2)
  }, [balance, token.decimals])

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        {imageUri ? (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <img src={imageUri} alt={'img'} className={'rounded-full'} />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {token.symbol.slice(0, 3) || 'N/A'}
            </span>
          </div>
        )}
        <div className="text-left">
          <p className="font-medium text-gray-900">{token.symbol}</p>
          <p className="text-sm text-gray-500">
            {token.address.slice(0, 6)}...{token.address.slice(-4)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium text-gray-900">{formattedBalance}</p>
        <p className="text-sm text-gray-500">Balance</p>
      </div>
    </button>
  )
}
