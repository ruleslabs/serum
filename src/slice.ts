import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MulticallFetchingPayload, MulticallListenerPayload, MulticallResultsPayload, MulticallState } from './types'
import { toCallKey } from './utils/callKey'

const initialState: MulticallState = {
  callListeners: {},
  callResults: {},
}

export function createMulticallSlice(reducerPath: string) {
  return createSlice({
    name: reducerPath,
    initialState,
    reducers: {
      addMulticallListeners: (state, action: PayloadAction<MulticallListenerPayload>) => {
        const { calls } = action.payload
        const listeners = state.callListeners

        calls.forEach((call) => {
          const callKey = toCallKey(call)
          listeners[callKey] = (listeners[callKey] ?? 0) + 1
        })
      },

      removeMulticallListeners: (state, action: PayloadAction<MulticallListenerPayload>) => {
        const { calls } = action.payload
        const listeners = state.callListeners

        calls.forEach((call) => {
          const callKey = toCallKey(call)
          if (!listeners[callKey]) return

          if (--listeners[callKey] <= 0) delete listeners[callKey]
        })
      },

      fetchMulticallResults: (state, action: PayloadAction<MulticallFetchingPayload>) => {
        const { fetchingBlockNumber, calls } = action.payload
        const results = state.callResults

        calls.forEach((call) => {
          const callKey = toCallKey(call)
          results[callKey] = results[callKey] ?? { fetchingBlockNumber }
          if ((results[callKey]?.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return
          results[callKey].fetchingBlockNumber = fetchingBlockNumber
        })
      },

      errorFetchingMulticallResults: (state, action: PayloadAction<MulticallFetchingPayload>) => {
        const { fetchingBlockNumber, calls } = action.payload
        const results = state.callResults

        calls.forEach((call) => {
          const callKey = toCallKey(call)
          if (typeof results[callKey]?.fetchingBlockNumber !== 'number') return
          if ((results[callKey]?.fetchingBlockNumber ?? 0) > fetchingBlockNumber) return

          results[callKey] = {
            data: null,
            blockNumber: fetchingBlockNumber,
          }
        })
      },

      updateMulticallResults: (state, action: PayloadAction<MulticallResultsPayload>) => {
        const { blockNumber, resultsData } = action.payload
        const results = state.callResults

        Object.keys(resultsData).forEach((callKey: string) => {
          results[callKey] = results[callKey] ?? {}
          if ((results[callKey].blockNumber ?? 0) >= blockNumber) return

          results[callKey] = {
            data: resultsData[callKey] ?? null,
            blockNumber,
          }
        })
      },
    },
  })
}

export type MulticallActions = ReturnType<typeof createMulticallSlice>['actions']
