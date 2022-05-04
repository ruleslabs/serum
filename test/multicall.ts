import { createMulticall } from '../src/create'

// Create a multicall instance with default settings
export const multicall = createMulticall()
export const {
  useMultipleContractSingleData,
} = multicall.hooks
