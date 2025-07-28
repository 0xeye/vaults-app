import { erc20Abi, erc4626Abi } from '@vaults4626/contracts'
import { readContract, readContracts } from '@wagmi/core'
import { SdkContext } from '../types'

export class CoreDataSource {
  private readonly queryClient
  private readonly wagmiConfig
  private readonly config

  constructor(context: SdkContext) {
    this.queryClient = context.queryClient
    this.wagmiConfig = context.wagmiConfig
    this.config = context.config
  }

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
}
