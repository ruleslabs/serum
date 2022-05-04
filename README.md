# Starknet Redux Multicall

React + Redux library to fetch starknet state at each new block through batched and cached calls.

### Setup

`yarn add @rulesorg/starknet-redux-multicall` or `npm install @rulesorg/starknet-redux-multicall`

### Usage

```js
import { combineReducers, createStore } from 'redux'
import { createMulticall } from '@rulesorg/starknet-redux-multicall'

// Create a multicall instance
export const multicall = createMulticall({ reducerPath: 'multicall' })

// Create multicall redux store
const reducer = combineReducers({ [multicall.reducerPath]: multicall.reducer })
export const store = createStore(reducer)

// Multicall hooks must be called inside the Multicall Updater
export function MulticallUpdater() {
  const latestBlockNumber = useLatestBlockNumber()
  const contract = useMulticallContract()

  return <multicall.Updater latestBlockNumber={latestBlockNumber} contract={contract} />
}
```

### Hooks

`useMultipleContractSingleData`


```js
const ETH_TOKEN_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
const DAI_TOKEN_ADDRESS = '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9'

const results = multicall.hooks.useMultipleContractSingleData(
  latestBlockNumber,
  [ETH_TOKEN_ADDRESS, DAI_TOKEN_ADDRESS],
  ERC20ABI as Abi,
  'balanceOf',
  { address }
)

console.log(results[0]?.result?.balance) // ETH balance as Uint256
console.log(results[1]?.result?.balance) // DAI balance as Uint256
```

### Disclaimer ⚠️

This repo contains highly experimental code. Use at your own risk.

### Credits

This library is inspired by [@uniswap/redux-multicall](https://github.com/Uniswap/redux-multicall).
