import { Dispatch, SetStateAction } from "react";

const updateSelectedState = (selected: Dispatch<SetStateAction<boolean>>) => {
  selected((prev) => !prev);
  setTimeout(() => {
    selected((prev) => !prev);
  }, 1000);
}

const updateCatchedState = (catched: Dispatch<SetStateAction<boolean>>) => {
  setTimeout(() => {
    catched((prev) => !prev);
  }, 1000);
}

export const catchRandomize = (oldData: number[], id: number, selected : Dispatch<SetStateAction<boolean>>, catched: Dispatch<SetStateAction<boolean>>) => {
  updateSelectedState(selected);
  const random = Math.floor(Math.random() * 10 + 1);
  console.log(random);
  if (random > 3) {
    oldData.push(id);
    updateCatchedState(catched);
  }
}

