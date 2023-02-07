import { StateCreator } from 'zustand'
import { GameboySlice } from '../useStore.js'


export const createGameboySlice: StateCreator<GameboySlice> = (set) => ({
    mooveUp: false,
    mooveDown: false,
    enter: false,

    setMooveUp: () => set((state) => ({ mooveUp: !state.mooveUp })),
    setMooveDown: () => set((state) => ({ mooveDown: !state.mooveDown })),
    setEnter: () => set((state) => ({ enter: !state.enter })),
})

