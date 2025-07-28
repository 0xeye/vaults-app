import { Modal } from '@/components/shared/Modal'
import { tokenlist } from '@/utils/tokenlist'
import { TVault } from '@ysplitter/sdk'
import { FC, useMemo, useState } from 'react'
import { isAddressEqual } from 'viem'

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (vault: TVault) => void
  vaults: TVault[]
  isLoading?: boolean
  selectedVault?: TVault
}

export const VaultSelectModal: FC<Props> = ({
  open,
  onClose,
  onSelect,
  vaults,
  isLoading = false,
  selectedVault,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  // Filter vaults based on search query
  const filteredVaults = useMemo(() => {
    if (!searchQuery) return vaults

    const query = searchQuery.toLowerCase()
    return vaults.filter(
      (vault) =>
        vault.name.toLowerCase().includes(query) ||
        vault.asset?.symbol.toLowerCase().includes(query) ||
        vault.address.toLowerCase().includes(query),
    )
  }, [vaults, searchQuery])

  const handleSelect = (vault: TVault) => {
    onSelect(vault)
    setSearchQuery('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Select Vault" maxWidth="max-w-md">
      {/* Vault List */}
      <div className="p-6 pt-4 max-h-[500px] overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <p className="text-gray-500 mt-2">Loading vaults...</p>
          </div>
        ) : filteredVaults.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No vaults found</p>
        ) : (
          <div className="space-y-2">
            {filteredVaults.map((vault) => (
              <VaultItem
                key={vault.address}
                vault={vault}
                onClick={() => handleSelect(vault)}
                isSelected={
                  selectedVault?.address
                    ? isAddressEqual(vault.address, selectedVault.address)
                    : false
                }
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}

// Vault Item Component
const VaultItem: FC<{
  vault: TVault
  onClick: () => void
  isSelected: boolean
}> = ({ vault, onClick, isSelected }) => {
  const apyDisplay = vault.apr.netAPR ? `${vault.apr.netAPR}%` : 'N/A'
  const imageUri = tokenlist[vault.asset?.address ?? '']

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 rounded-lg transition-all flex items-center justify-between group ${
        isSelected
          ? 'bg-blue-50 border-2 border-blue-500'
          : 'hover:bg-gray-50 border-2 border-transparent'
      }`}
    >
      <div className="flex items-center space-x-4 flex-1">
        {imageUri ? (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <img src={imageUri} alt={'img'} className={'rounded-full'} />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {vault.asset?.symbol.slice(0, 3) || 'N/A'}
            </span>
          </div>
        )}
        <div className="text-left flex-1">
          <p className="font-medium text-gray-900">{vault.name}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{vault.asset?.symbol || 'Unknown'}</span>
            <span>•</span>
            <span>
              {vault.address.slice(0, 6)}...{vault.address.slice(-4)}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg text-green-600">{apyDisplay}</p>
        <p className="text-sm text-gray-500">APY</p>
      </div>
    </button>
  )
}
