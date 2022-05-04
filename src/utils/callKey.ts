import { Call } from '@/types'

export function toCallKey(call: Call): string {
  return [
    call.address,
    call.selector,
    JSON.stringify(call.outputsAbi),
    JSON.stringify(call.structsAbi),
    JSON.stringify(call.calldata),
  ].join('-')
}

export function parseCallKey(key: string): Call {
  const splittedKey = key.split('-')
  if (splittedKey.length !== 5) throw 'Invalid key'

  return {
    address: splittedKey[0],
    selector: splittedKey[1],
    outputsAbi: JSON.parse(splittedKey[2]),
    structsAbi: JSON.parse(splittedKey[3]),
    calldata: JSON.parse(splittedKey[4]),
  }
}
