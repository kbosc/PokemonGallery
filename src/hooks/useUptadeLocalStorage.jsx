import { catchRandomize } from "../components/pokemonCard/utils/catchRandomize";

export default function useUptadeLocalStorage(
  e,
  setOldData,
  oldData,
  id,
  setSelected,
  setCatched
) {
  const addPokemon = e.target.innerText;

  if (addPokemon === "") {
    if (!localStorage.getItem("storagePokemon").includes(id)) {
      catchRandomize(setOldData, id, setSelected, setCatched, oldData);
    }
  } else {
    console.log("le pokemon était dans le storage");
    setOldData((prev) => prev.filter((ids) => ids !== id));
    setCatched((prev) => !prev);
  }
  localStorage.setItem(
    "storagePokemon",
    JSON.stringify(oldData.sort((a, b) => a - b))
  );
}
