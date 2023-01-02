import create from 'zustand'
import { createBearSlice } from './slice/bearSlice.js'
import { createFishSlice } from './slice/fishSlice.js'

export interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}

export interface FishSlice {
  fishes: number
  addFish: () => void
}

export const useStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))