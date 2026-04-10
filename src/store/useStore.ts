import { create } from 'zustand'
import { createGameboySlice } from './slice/gameboySlice'

export interface GameboySlice {
  mooveUp: boolean
  mooveDown: boolean
  enter: boolean
  setMooveUp: () => void
  setMooveDown: () => void
  setEnter: () => void
}

export const useStore = create<GameboySlice>()((...a) => ({
  ...createGameboySlice(...a),
}))
