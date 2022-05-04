import React from 'react'
import { defaultProvider } from 'starknet'

import { Provider } from 'react-redux'
import { useLatestBlock, useEthBalance } from './hooks'
import { store } from './store'
import { Updater } from './Updater'

export function App() {
  const blockNumber = useLatestBlock(defaultProvider)

  return (
    <Provider store={store}>
      <Updater blockNumber={blockNumber} />
      <Home blockNumber={blockNumber} />
    </Provider>
  )
}

interface HomeProps {
  blockNumber: number | undefined
}

function Home({ blockNumber }: HomeProps) {
  const balance = useEthBalance(blockNumber, '0x557b047d712012c9d34a0f1cf38455cd28b5a35786331c95f61cd3a82a52294')

  return (
    <div>
      <h1>Hello Multicall</h1>
      <h2>Block number:</h2>
      {blockNumber && <p data-testid="blockNumber">{blockNumber}</p>}
      <h2>ETH Balance:</h2>
      {balance && <p data-testid="ETHbalance">{balance}</p>}
    </div>
  )
}
