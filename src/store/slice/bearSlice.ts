// export const createBearSlice = (set) => ({
//     bears: 0,
//     addBear: () => set((state) => ({ bears: state.bears + 1 })),
//     eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
//   })

export interface BearSlice {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

export const createBearSlice = (set: (state: BearSlice) => BearSlice): BearSlice => ({
  bears: 0,
  addBear: () => set((state: BearSlice) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state: BearSlice) => ({ fishes: state.fishes - 1 })),
});
