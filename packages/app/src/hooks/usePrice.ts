import { useSdk } from '@/context/Sdk'
import { exactToSimple } from '@/utils'
import { queryKeys } from '@/utils/queryKeys'
import { useQuery } from '@tanstack/react-query'

export const usePrice = (tokenAddress?: string) => {
  const sdk = useSdk()
  return useQuery({
    queryKey: queryKeys.tokenPrice(tokenAddress),
    queryFn: () => sdk.core.getTokenPrice(tokenAddress),
    enabled: !!tokenAddress,
  })
}

export const usePositionValueUSD = (tokenAddress?: string, amount = 0n) => {
  const { data: price } = usePrice(amount > 0n ? tokenAddress : undefined)
  return price ? price * exactToSimple(amount) : 0
}
