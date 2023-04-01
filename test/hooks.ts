import JSBI from 'jsbi'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { Contract, Abi, GetBlockResponse, Provider } from 'starknet'

import ERC20ABI from './ERC20.json'
import MulticallABI from './multicall.json'

import { useMultipleContractSingleData } from './multicall'

const BLOCK_POLLING = 5000
const ETH_ADDRESS = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
const MULTICALL_ADDRESS = '0x023b40e9df56f4c18025b5c27c8ae2132f29460ae8fbd4c49091be45a76244d2'
const BIG_INT_UINT126_HIGH_FACTOR = JSBI.exponentiate(JSBI.BigInt(256), JSBI.BigInt(16))

interface Uint256 {
  low?: string
  high?: string
}

const provider = new Provider({
  sequencer: { baseUrl: 'https://alpha4.starknet.io', feederGatewayUrl: 'feeder_gateway' }
})

export function useLatestBlock(): number | undefined {
  const [blockNumber, setBlockNumber] = useState<number | undefined>()

  const fetchBlock = useCallback(() => {
    if (!provider) return
    provider
      .getBlock('latest')
      .then((block: GetBlockResponse) => {
        setBlockNumber(block.block_number)
      })
      .catch(() => {
        console.error('failed fetching block')
      })
  }, [provider, setBlockNumber])

  useEffect(() => {
    fetchBlock() // first fetch

    const handler = setInterval(() => {
      fetchBlock()
    }, BLOCK_POLLING)

    return () => {
      clearInterval(handler)
    }
  }, [fetchBlock])

  return blockNumber
}

export function useEthBalance(blockNumber: number | undefined, address: string) {
  const results = useMultipleContractSingleData(
    blockNumber,
    [ETH_ADDRESS],
    ERC20ABI as Abi,
    'balanceOf',
    { address } // TODO use the right hook ^^
  )

  return useMemo(() => {
    const balance = results[0]?.result?.balance as Uint256
    if (!balance?.low || !balance?.high) return null

    const high = JSBI.multiply(JSBI.BigInt(balance.high), BIG_INT_UINT126_HIGH_FACTOR)
    const low = JSBI.BigInt(balance.low)
    const amount = JSBI.add(high, low)

    return amount.toString()
  }, [results, address])
}

export function useContract(): Contract | null {
  return useMemo(() => {
    return new Contract(MulticallABI as Abi, MULTICALL_ADDRESS, provider)
  }, [])
}
