import { useSdk } from '@/context/Sdk'
import { isChainSupported } from '@/utils/chainSupport'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'
import { useChainId } from 'wagmi'
import { useAccount } from './useAccount'

export const useVaultDetails = (vaultAddress?: `0x${string}`) => {
  const sdk = useSdk()
  const chainId = useChainId()
  const account = useAccount()

  return useQuery({
    queryKey: queryKeys.vaultDetails(chainId, vaultAddress),
    queryFn: () => sdk.core.getVaultDetails(vaultAddress, account),
    staleTime: 0,
    gcTime: 0,
    enabled: isChainSupported(chainId),
  })
}
