export function catchRandomize(data, id, selected) {
  selected((prev) => !prev);
  setTimeout(() => {
    selected((prev) => !prev);
  }, 1000);
  const random = Math.floor(Math.random() * 11);
  return random > 3 && data.push(id);
}
