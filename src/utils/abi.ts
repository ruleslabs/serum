import { Abi, AbiEntry, StructAbi } from 'starknet'

import { StructsAbi } from '@/types'

export function getStructsAbiFromAbiEntries(abi: Abi, outputsAbi?: AbiEntry[]): StructsAbi {
  if (!outputsAbi) return {}

  return outputsAbi.reduce<StructsAbi>((acc, { type }: { type: string }) => {
    if (type === 'felt' || type === 'felt*' || type.indexOf('(') !== -1) return acc // not a struct

    const structName = type.replace('*', '')
    if (!!acc[structName]) return acc // already added

    const struct = abi.find((abi) => abi.name === structName) as StructAbi
    acc[structName] = struct.members.map<AbiEntry>((member) => ({ name: member.name, type: member.type }))

    return { ...acc, ...getStructsAbiFromAbiEntries(abi, acc[structName]) }
  }, {})
}
