import type { MulticallContext } from './context'
import { useMultipleContractSingleData as _useMultipleContractSingleData } from './hooks'
import { createMulticallSlice } from './slice'
import { createUpdater } from './updater'

type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0
  ? undefined
  : ((...b: T) => void) extends (a: any, ...b: infer I) => void
  ? I
  : []
type ParamsWithoutContext<T extends (...args: any) => any> = RemoveFirstFromTuple<Parameters<T>>

export interface MulticallOptions {
  reducerPath?: string
  // More options can be added here as multicall's capabilities are extended
}

// Inspired by RTK Query's createApi
export function createMulticall(options?: MulticallOptions) {
  const reducerPath = options?.reducerPath ?? 'multicall'
  const slice = createMulticallSlice(reducerPath)
  const { actions, reducer } = slice
  const context: MulticallContext = { reducerPath, actions }

  const useMultipleContractSingleData = (...args: ParamsWithoutContext<typeof _useMultipleContractSingleData>) =>
    _useMultipleContractSingleData(context, ...args)

  const hooks = {
    useMultipleContractSingleData,
  }

  const Updater = createUpdater(context)

  return {
    reducerPath,
    reducer,
    actions,
    hooks,
    Updater,
  }
}
