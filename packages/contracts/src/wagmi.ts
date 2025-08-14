import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc4626
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc4626Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'asset', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'role_manager', type: 'address' },
      { name: 'profit_max_unlock_time', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_accountant', type: 'address' }],
    name: 'set_accountant',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_default_queue', type: 'address[]' }],
    name: 'set_default_queue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'use_default_queue', type: 'bool' }],
    name: 'set_use_default_queue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'deposit_limit', type: 'uint256' }],
    name: 'set_deposit_limit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'deposit_limit', type: 'uint256' },
      { name: 'override', type: 'bool' },
    ],
    name: 'set_deposit_limit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'deposit_limit_module', type: 'address' }],
    name: 'set_deposit_limit_module',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'deposit_limit_module', type: 'address' },
      { name: 'override', type: 'bool' },
    ],
    name: 'set_deposit_limit_module',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'withdraw_limit_module', type: 'address' }],
    name: 'set_withdraw_limit_module',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'minimum_total_idle', type: 'uint256' }],
    name: 'set_minimum_total_idle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_profit_max_unlock_time', type: 'uint256' }],
    name: 'setProfitMaxUnlockTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'uint256' },
    ],
    name: 'set_role',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'uint256' },
    ],
    name: 'add_role',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'role', type: 'uint256' },
    ],
    name: 'remove_role',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'role_manager', type: 'address' }],
    name: 'transfer_role_manager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accept_role_manager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'isShutdown',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockedShares',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pricePerShare',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'get_default_queue',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'strategy', type: 'address' }],
    name: 'process_report',
    outputs: [
      { name: '', type: 'uint256' },
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'buy_debt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'new_strategy', type: 'address' }],
    name: 'add_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'new_strategy', type: 'address' },
      { name: 'add_to_queue', type: 'bool' },
    ],
    name: 'add_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'strategy', type: 'address' }],
    name: 'revoke_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'strategy', type: 'address' }],
    name: 'force_revoke_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'new_max_debt', type: 'uint256' },
    ],
    name: 'update_max_debt_for_strategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'target_debt', type: 'uint256' },
    ],
    name: 'update_debt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'target_debt', type: 'uint256' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'update_debt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'shutdown_vault',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
    ],
    name: 'redeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'redeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'redeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'v', type: 'uint8' },
      { name: 'r', type: 'bytes32' },
      { name: 's', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalIdle',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalDebt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'receiver', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'receiver', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'maxWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'maxWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
    ],
    name: 'maxRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'max_loss', type: 'uint256' },
      { name: 'strategies', type: 'address[]' },
    ],
    name: 'maxRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FACTORY',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'apiVersion',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'strategy', type: 'address' },
      { name: 'assets_needed', type: 'uint256' },
    ],
    name: 'assess_share_of_unrealised_losses',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'profitMaxUnlockTime',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fullProfitUnlockDate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'profitUnlockingRate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastProfitUpdate',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'strategies',
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'activation', type: 'uint256' },
          { name: 'last_report', type: 'uint256' },
          { name: 'current_debt', type: 'uint256' },
          { name: 'max_debt', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    name: 'default_queue',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'use_default_queue',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'arg0', type: 'address' },
      { name: 'arg1', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minimum_total_idle',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit_limit',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accountant',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit_limit_module',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw_limit_module',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'roles',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'role_manager',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'future_role_manager',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'arg0', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useErc20 = /*#__PURE__*/ createUseReadContract({ abi: erc20Abi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const usePrepareErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const usePrepareErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const usePrepareErc20Transfer = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const usePrepareErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__
 */
export const useErc4626 = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"isShutdown"`
 */
export const useErc4626IsShutdown = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'isShutdown',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"unlockedShares"`
 */
export const useErc4626UnlockedShares = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'unlockedShares',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"pricePerShare"`
 */
export const useErc4626PricePerShare = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'pricePerShare',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"get_default_queue"`
 */
export const useErc4626GetDefaultQueue = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'get_default_queue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useErc4626BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useErc4626TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"totalAssets"`
 */
export const useErc4626TotalAssets = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'totalAssets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"totalIdle"`
 */
export const useErc4626TotalIdle = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'totalIdle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"totalDebt"`
 */
export const useErc4626TotalDebt = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'totalDebt',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"convertToShares"`
 */
export const useErc4626ConvertToShares = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'convertToShares',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"previewDeposit"`
 */
export const useErc4626PreviewDeposit = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'previewDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"previewMint"`
 */
export const useErc4626PreviewMint = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'previewMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"convertToAssets"`
 */
export const useErc4626ConvertToAssets = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'convertToAssets',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"maxDeposit"`
 */
export const useErc4626MaxDeposit = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'maxDeposit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"maxMint"`
 */
export const useErc4626MaxMint = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'maxMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"maxWithdraw"`
 */
export const useErc4626MaxWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'maxWithdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"maxRedeem"`
 */
export const useErc4626MaxRedeem = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'maxRedeem',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"previewWithdraw"`
 */
export const useErc4626PreviewWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'previewWithdraw',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"previewRedeem"`
 */
export const useErc4626PreviewRedeem = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'previewRedeem',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"FACTORY"`
 */
export const useErc4626Factory = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'FACTORY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"apiVersion"`
 */
export const useErc4626ApiVersion = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'apiVersion',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"assess_share_of_unrealised_losses"`
 */
export const useErc4626AssessShareOfUnrealisedLosses =
  /*#__PURE__*/ createUseReadContract({
    abi: erc4626Abi,
    functionName: 'assess_share_of_unrealised_losses',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"profitMaxUnlockTime"`
 */
export const useErc4626ProfitMaxUnlockTime =
  /*#__PURE__*/ createUseReadContract({
    abi: erc4626Abi,
    functionName: 'profitMaxUnlockTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"fullProfitUnlockDate"`
 */
export const useErc4626FullProfitUnlockDate =
  /*#__PURE__*/ createUseReadContract({
    abi: erc4626Abi,
    functionName: 'fullProfitUnlockDate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"profitUnlockingRate"`
 */
export const useErc4626ProfitUnlockingRate =
  /*#__PURE__*/ createUseReadContract({
    abi: erc4626Abi,
    functionName: 'profitUnlockingRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"lastProfitUpdate"`
 */
export const useErc4626LastProfitUpdate = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'lastProfitUpdate',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useErc4626DomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'DOMAIN_SEPARATOR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"asset"`
 */
export const useErc4626Asset = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'asset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"decimals"`
 */
export const useErc4626Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"strategies"`
 */
export const useErc4626Strategies = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'strategies',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"default_queue"`
 */
export const useErc4626DefaultQueue = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'default_queue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"use_default_queue"`
 */
export const useErc4626UseDefaultQueue = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'use_default_queue',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"allowance"`
 */
export const useErc4626Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"minimum_total_idle"`
 */
export const useErc4626MinimumTotalIdle = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'minimum_total_idle',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"deposit_limit"`
 */
export const useErc4626DepositLimit = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'deposit_limit',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"accountant"`
 */
export const useErc4626Accountant = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'accountant',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"deposit_limit_module"`
 */
export const useErc4626DepositLimitModule = /*#__PURE__*/ createUseReadContract(
  { abi: erc4626Abi, functionName: 'deposit_limit_module' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"withdraw_limit_module"`
 */
export const useErc4626WithdrawLimitModule =
  /*#__PURE__*/ createUseReadContract({
    abi: erc4626Abi,
    functionName: 'withdraw_limit_module',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"roles"`
 */
export const useErc4626Roles = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'roles',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"role_manager"`
 */
export const useErc4626RoleManager = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'role_manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"future_role_manager"`
 */
export const useErc4626FutureRoleManager = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'future_role_manager',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"name"`
 */
export const useErc4626Name = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"symbol"`
 */
export const useErc4626Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"nonces"`
 */
export const useErc4626Nonces = /*#__PURE__*/ createUseReadContract({
  abi: erc4626Abi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__
 */
export const useWriteErc4626 = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"initialize"`
 */
export const useWriteErc4626Initialize = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_accountant"`
 */
export const useWriteErc4626SetAccountant =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_accountant',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_default_queue"`
 */
export const useWriteErc4626SetDefaultQueue =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_default_queue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_use_default_queue"`
 */
export const useWriteErc4626SetUseDefaultQueue =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_use_default_queue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_deposit_limit"`
 */
export const useWriteErc4626SetDepositLimit =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_deposit_limit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_deposit_limit_module"`
 */
export const useWriteErc4626SetDepositLimitModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_deposit_limit_module',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_withdraw_limit_module"`
 */
export const useWriteErc4626SetWithdrawLimitModule =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_withdraw_limit_module',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_minimum_total_idle"`
 */
export const useWriteErc4626SetMinimumTotalIdle =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'set_minimum_total_idle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"setProfitMaxUnlockTime"`
 */
export const useWriteErc4626SetProfitMaxUnlockTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'setProfitMaxUnlockTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_role"`
 */
export const useWriteErc4626SetRole = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'set_role',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"add_role"`
 */
export const useWriteErc4626AddRole = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'add_role',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"remove_role"`
 */
export const useWriteErc4626RemoveRole = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'remove_role',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"transfer_role_manager"`
 */
export const useWriteErc4626TransferRoleManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'transfer_role_manager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"accept_role_manager"`
 */
export const useWriteErc4626AcceptRoleManager =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'accept_role_manager',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"process_report"`
 */
export const useWriteErc4626ProcessReport =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'process_report',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"buy_debt"`
 */
export const useWriteErc4626BuyDebt = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'buy_debt',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"add_strategy"`
 */
export const useWriteErc4626AddStrategy = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'add_strategy',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"revoke_strategy"`
 */
export const useWriteErc4626RevokeStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'revoke_strategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"force_revoke_strategy"`
 */
export const useWriteErc4626ForceRevokeStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'force_revoke_strategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"update_max_debt_for_strategy"`
 */
export const useWriteErc4626UpdateMaxDebtForStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'update_max_debt_for_strategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"update_debt"`
 */
export const useWriteErc4626UpdateDebt = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'update_debt',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"shutdown_vault"`
 */
export const useWriteErc4626ShutdownVault =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc4626Abi,
    functionName: 'shutdown_vault',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"deposit"`
 */
export const useWriteErc4626Deposit = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteErc4626Mint = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteErc4626Withdraw = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"redeem"`
 */
export const useWriteErc4626Redeem = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc4626Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc4626Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc4626TransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: erc4626Abi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"permit"`
 */
export const useWriteErc4626Permit = /*#__PURE__*/ createUseWriteContract({
  abi: erc4626Abi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__
 */
export const usePrepareErc4626 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc4626Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"initialize"`
 */
export const usePrepareErc4626Initialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_accountant"`
 */
export const usePrepareErc4626SetAccountant =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_accountant',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_default_queue"`
 */
export const usePrepareErc4626SetDefaultQueue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_default_queue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_use_default_queue"`
 */
export const usePrepareErc4626SetUseDefaultQueue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_use_default_queue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_deposit_limit"`
 */
export const usePrepareErc4626SetDepositLimit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_deposit_limit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_deposit_limit_module"`
 */
export const usePrepareErc4626SetDepositLimitModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_deposit_limit_module',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_withdraw_limit_module"`
 */
export const usePrepareErc4626SetWithdrawLimitModule =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_withdraw_limit_module',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_minimum_total_idle"`
 */
export const usePrepareErc4626SetMinimumTotalIdle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'set_minimum_total_idle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"setProfitMaxUnlockTime"`
 */
export const usePrepareErc4626SetProfitMaxUnlockTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'setProfitMaxUnlockTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"set_role"`
 */
export const usePrepareErc4626SetRole = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc4626Abi, functionName: 'set_role' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"add_role"`
 */
export const usePrepareErc4626AddRole = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc4626Abi, functionName: 'add_role' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"remove_role"`
 */
export const usePrepareErc4626RemoveRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'remove_role',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"transfer_role_manager"`
 */
export const usePrepareErc4626TransferRoleManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'transfer_role_manager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"accept_role_manager"`
 */
export const usePrepareErc4626AcceptRoleManager =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'accept_role_manager',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"process_report"`
 */
export const usePrepareErc4626ProcessReport =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'process_report',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"buy_debt"`
 */
export const usePrepareErc4626BuyDebt = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc4626Abi, functionName: 'buy_debt' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"add_strategy"`
 */
export const usePrepareErc4626AddStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'add_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"revoke_strategy"`
 */
export const usePrepareErc4626RevokeStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'revoke_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"force_revoke_strategy"`
 */
export const usePrepareErc4626ForceRevokeStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'force_revoke_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"update_max_debt_for_strategy"`
 */
export const usePrepareErc4626UpdateMaxDebtForStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'update_max_debt_for_strategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"update_debt"`
 */
export const usePrepareErc4626UpdateDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'update_debt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"shutdown_vault"`
 */
export const usePrepareErc4626ShutdownVault =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'shutdown_vault',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"deposit"`
 */
export const usePrepareErc4626Deposit = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc4626Abi, functionName: 'deposit' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"mint"`
 */
export const usePrepareErc4626Mint = /*#__PURE__*/ createUseSimulateContract({
  abi: erc4626Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"withdraw"`
 */
export const usePrepareErc4626Withdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"redeem"`
 */
export const usePrepareErc4626Redeem = /*#__PURE__*/ createUseSimulateContract({
  abi: erc4626Abi,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"approve"`
 */
export const usePrepareErc4626Approve = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc4626Abi, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"transfer"`
 */
export const usePrepareErc4626Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"transferFrom"`
 */
export const usePrepareErc4626TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc4626Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc4626Abi}__ and `functionName` set to `"permit"`
 */
export const usePrepareErc4626Permit = /*#__PURE__*/ createUseSimulateContract({
  abi: erc4626Abi,
  functionName: 'permit',
})
