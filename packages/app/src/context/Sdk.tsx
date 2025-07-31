import { config } from '@/config/wagmi'
import { queryClient } from '@/context/queryClient'
import { Sdk } from '@vaults4626/sdk'
import { type FC, PropsWithChildren, createContext, useContext, useMemo } from 'react'

const context = createContext<Sdk>(null as never)

export const SdkProvider: FC<PropsWithChildren> = ({ children }) => {
  const sdk = useMemo(() => Sdk.create(queryClient, config, {
    apiKeys: {
      coingecko: import.meta.env.VITE_COINGECKO_API_KEY
    }
  }), [])
  return <context.Provider value={sdk}>{children}</context.Provider>
}

export const useSdk = () => useContext(context)
