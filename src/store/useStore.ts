import create from 'zustand'
import { createBearSlice } from './slice/bearSlice.js'
import { createFishSlice } from './slice/fishSlice.js'
import { createGameboySlice } from './slice/gameboySlice.js'

export interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}

export interface FishSlice {
  fishes: number
  addFish: () => void
}

export interface GameboySlice {
  mooveUp: boolean
  mooveDown: boolean
  enter: boolean
  setMooveUp: () => void
  setMooveDown: () => void
  setEnter: () => void
}

export const useStore = create<BearSlice & FishSlice & GameboySlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createGameboySlice(...a),
}))