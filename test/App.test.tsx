import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { App } from './App'

describe('Use multicall in test application', () => {
  it('Renders correctly initially', () => {
    render(<App />)
    const h1 = screen.getByText('Hello Multicall') // H1 in Home
    expect(h1).toBeTruthy()
    const missing = screen.queryByText('Does Not Exist')
    expect(missing).toBeFalsy()
  })

  it('Performs a single contract multicall query', async () => {
    render(<App />)
    // Check that block number is correctly retrieved from block
    const blockNumber = await waitFor(() => screen.getByTestId('blockNumber'), { timeout: 20_000 /* 20 seconds */ })
    expect(blockNumber && blockNumber?.textContent).toBeTruthy()
    console.log('blockNumber', blockNumber.textContent!)

    const balance = await waitFor(() => screen.getByTestId('ETHbalance'), { timeout: 20_000 /* 20 seconds */ })
    expect(balance && balance?.textContent).toBeTruthy()
    console.log('balance', balance.textContent!)
  }, 50_000 /* 50 seconds */)
})
