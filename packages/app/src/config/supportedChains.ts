import { arbitrum, base, mainnet, optimism, polygon } from 'viem/chains'

export const supportedChains = [mainnet, base, arbitrum, optimism, polygon] as const

export type SupportedChain = (typeof supportedChains)[number]['id']

export const getSupportedChain = <T extends number>(chainId: T) =>
  supportedChains.find((c) => c.id === chainId)
