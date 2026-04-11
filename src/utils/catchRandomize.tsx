import { Dispatch, SetStateAction } from "react";

const updateSelectedState = (selected: Dispatch<SetStateAction<boolean>>) => {
  selected((prev) => !prev);
  setTimeout(() => {
    selected((prev) => !prev);
  }, 1000);
}

const updateCaughtState = (caught: Dispatch<SetStateAction<boolean>>) => {
  setTimeout(() => {
    caught((prev) => !prev);
  }, 1000);
}

export const catchRandomize = (oldData: number[], id: number, selected : Dispatch<SetStateAction<boolean>>, caught: Dispatch<SetStateAction<boolean>>) => {
  updateSelectedState(selected);
  const random = Math.floor(Math.random() * 10 + 1);
  if (random > 3) {
    oldData.push(id);
    updateCaughtState(caught);
  }
}

