import { erc20Abi, erc4626Abi } from '@vaults4626/contracts'
import { readContract, readContracts } from '@wagmi/core'
import { SdkContext } from '../types'
import { BaseDataSource } from './BaseDataSource'

export class CoreDataSource extends BaseDataSource {
  constructor(context: SdkContext) {
    super(context, 'core')
  }

  protected getEndpoint(_chainId?: number): string | undefined {
    return undefined
  }

  protected async onInitialize(): Promise<void> {}

  protected onDispose(): void {}

  async getVaultDetails(
    vaultAddress?: `0x${string}`,
    userAddress?: `0x${string}`,
  ): Promise<
    | {
        address: `0x${string}`
        name: string
        symbol: string
        decimals: number
        asset:
          | {
              address: `0x${string}`
              symbol: string
              decimals: number
            }
          | undefined
        user: {
          assets: bigint
          shares: bigint
        }
      }
    | undefined
  > {
    if (!vaultAddress) return undefined

    const readContractsCalls = [
      { address: vaultAddress, abi: erc4626Abi, functionName: 'name' },
      { address: vaultAddress, abi: erc4626Abi, functionName: 'symbol' },
      { address: vaultAddress, abi: erc4626Abi, functionName: 'decimals' },
      { address: vaultAddress, abi: erc4626Abi, functionName: 'asset' },
      { address: vaultAddress, abi: erc4626Abi, functionName: 'balanceOf', args: [userAddress] },
    ]
    const readContractsResult = await readContracts(this.wagmiConfig, {
      contracts: readContractsCalls as any,
    })

    if (readContractsResult.length !== 5) return undefined

    const [name, symbol, decimals, _asset, balanceOf = 0n] = readContractsResult.map(
      (result) => result.result,
    ) as [string, string, number, `0x${string}`, bigint]

    const [asset, user] = await Promise.all([
      this.getAssetDetails(_asset),
      this.getUserUnderlying(vaultAddress, balanceOf),
    ])

    return { address: vaultAddress, name, symbol, decimals, asset, user }
  }

  private async getAssetDetails(address: `0x${string}`): Promise<
    | {
        address: `0x${string}`
        symbol: string
        decimals: number
      }
    | undefined
  > {
    const readContractsCalls = [
      { address, abi: erc20Abi, functionName: 'symbol' },
      { address, abi: erc20Abi, functionName: 'decimals' },
    ]

    const readContractsResult = await readContracts(this.wagmiConfig, {
      contracts: readContractsCalls as any,
    })

    if (readContractsResult.length !== 2) return undefined

    const [symbol, decimals] = readContractsResult.map((result) => result.result) as [
      string,
      number,
    ]

    return { symbol, decimals, address }
  }

  private async getUserUnderlying(
    vaultAddress: `0x${string}`,
    shares: bigint,
  ): Promise<{ assets: bigint; shares: bigint }> {
    const assets = await readContract(this.wagmiConfig, {
      address: vaultAddress,
      abi: erc4626Abi,
      functionName: 'convertToAssets',
      args: [shares],
    })
    return { assets, shares }
  }

  async getTokenPrice(tokenAddress?: string, currency = 'usd'): Promise<number | undefined> {
    if (!tokenAddress) return undefined

    const coingeckoEndpoint = this.config.endpoints.coingecko
    const apiKey = this.config.apiKeys?.coingecko

    if (!coingeckoEndpoint) {
      console.warn('Coingecko endpoint not configured')
      return undefined
    }

    try {
      const url = new URL(`${coingeckoEndpoint}/simple/token_price/ethereum`)
      url.searchParams.append('contract_addresses', tokenAddress.toLowerCase())
      url.searchParams.append('vs_currencies', currency)

      if (apiKey) {
        url.searchParams.append('x_cg_demo_api_key', apiKey)
      }

      const response = await fetch(url.toString(), {
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Coingecko API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const price = data[tokenAddress.toLowerCase()]?.[currency]

      return price
    } catch (error) {
      console.error('Failed to fetch token price from Coingecko:', error)
      return undefined
    }
  }

  async getTokenPrices(
    tokenAddresses: string[],
    currency = 'usd',
  ): Promise<Record<string, number>> {
    const coingeckoEndpoint = this.config.endpoints.coingecko
    const apiKey = this.config.apiKeys?.coingecko

    if (!coingeckoEndpoint) {
      console.warn('Coingecko endpoint not configured')
      return {}
    }

    try {
      const url = new URL(`${coingeckoEndpoint}/simple/token_price/ethereum`)
      url.searchParams.append(
        'contract_addresses',
        tokenAddresses.map((a) => a.toLowerCase()).join(','),
      )
      url.searchParams.append('vs_currencies', currency)

      if (apiKey) {
        url.searchParams.append('x_cg_demo_api_key', apiKey)
      }

      const response = await fetch(url.toString(), {
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Coingecko API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      const prices: Record<string, number> = {}

      for (const address of tokenAddresses) {
        const price = data[address.toLowerCase()]?.[currency]
        if (price !== undefined) {
          prices[address] = price
        }
      }

      return prices
    } catch (error) {
      console.error('Failed to fetch token prices from Coingecko:', error)
      return {}
    }
  }
}
