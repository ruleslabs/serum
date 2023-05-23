import { RawArgs } from 'starknet'
import { OptionalRawArgs } from './types'

export function areCallInputsValid(callInputs?: OptionalRawArgs): callInputs is RawArgs {
  if (!callInputs) return false

  for (const key of Object.keys(callInputs)) {
    if (!(callInputs as any)[key]) return false
  }

  return true
}
