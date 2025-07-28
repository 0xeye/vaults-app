import { QueryClient } from '@tanstack/react-query'

// Key store for all queries
export const queryKeys = {
  vaultDetails: (chainId: number, vaultAddress?: `0x${string}`) =>
    ['vaultDetails', vaultAddress, chainId] as const,
} as const

// Helper functions for query operations
export const queryHelpers = {
  invalidateVaultDetails: (
    queryClient: QueryClient,
    chainId: number,
    vaultAddress?: `0x${string}`,
  ) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.vaultDetails(chainId, vaultAddress),
    })
  },
}
