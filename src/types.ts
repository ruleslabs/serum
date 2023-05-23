import { AbiEntry, Calldata, num } from 'starknet'

export interface CallResultData {
  [key: string]: string | string[] | number | CallResultData
}

export interface MulticallState {
  callListeners: {
    // Store the number of listeners per call
    [callKey: string]: number
  }
  callResults: {
    [callKey: string]: {
      data?: CallResultData | null
      blockNumber?: number
      fetchingBlockNumber?: number
    }
  }
}

export interface WithMulticallState {
  [path: string]: MulticallState
}

export interface StructsAbi {
  [name: string]: AbiEntry[]
}

export interface Call {
  address: string
  selector: string
  outputsAbi: AbiEntry[]
  structsAbi: StructsAbi
  calldata: Calldata
}

export interface CallResult {
  data?: CallResultData
  valid: boolean
  blockNumber?: number
}

export interface CallState {
  result?: CallResultData
  valid: boolean
  syncing: boolean
  loading: boolean
  error: boolean
}

// Actions

export interface MulticallListenerPayload {
  calls: Call[]
}

export interface MulticallFetchingPayload {
  fetchingBlockNumber: number
  calls: Call[]
}

export interface MulticallResultsPayload {
  blockNumber: number
  resultsData: { [key: string]: CallResultData }
}

export type NullableBigNumberish = num.BigNumberish | undefined | null

export type OptionalRawArgs = {
  [inputName: string]: NullableBigNumberish | NullableBigNumberish[] | {
      type: 'struct'
      [k: string]: NullableBigNumberish
  };
} | NullableBigNumberish[]
