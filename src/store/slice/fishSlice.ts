// export const createFishSlice = (set) => ({
//     fishes: 0,
//     addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
//   })
interface FishSlice {
  fishes: number;
  addFish: () => void;
}

export const createFishSlice = (set: (state: FishSlice) => FishSlice): FishSlice => ({
  fishes: 0,
  addFish: () => set((state: FishSlice) => ({ fishes: state.fishes + 1 })),
});
