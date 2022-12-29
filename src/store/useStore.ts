import create from 'zustand'
import { createBearSlice } from './slice/bearSlice.ts'
import { createFishSlice } from './slice/fishSlice.ts'

export const useStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))