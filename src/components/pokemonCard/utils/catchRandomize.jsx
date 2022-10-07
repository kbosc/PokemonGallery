export function catchRandomize(oldData, id, selected, catched) {
  selected((prev) => !prev);
  setTimeout(() => {
    selected((prev) => !prev);
  }, 1000);
  const random = Math.floor(Math.random() * 11);
  if (random > 3) {
    // setOldData((prev) => [...prev, id]);
    oldData.push(id);
    setTimeout(() => {
      catched((prev) => !prev);
    }, 1000);
  }
}
