import React from 'react'
import { useContract } from './hooks'
import { multicall } from './multicall'

interface Props {
  blockNumber: number | undefined
}

export function Updater({ blockNumber }: Props) {
  const contract = useContract()
  if (!contract) return null
  return <multicall.Updater latestBlockNumber={blockNumber ?? 0} contract={contract} />
}
