import { CallState } from './types'

export const MAX_CALLS_PER_CHUNK = 50 // arbitray limit: discord.com/channels/793094838509764618/853954510515208192/955393106520461372

export const INVALID_CALL_STATE: CallState = {
  valid: false,
  syncing: false,
  loading: false,
  error: false,
}

export const LOADING_CALL_STATE: CallState = {
  valid: true,
  syncing: true,
  loading: true,
  error: false,
}
