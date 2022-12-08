
const parseLocalStorageValue = (value: string) => {
  return JSON.parse(value);
}

const stringifyLocalStorageValue = (value: number) => {
  return JSON.stringify(value);
}

export const getLocalStorageItem = (key: string): string | undefined => {
  const value = window.localStorage.getItem(key);
  if (value === null) {
    return undefined;
  }
  return parseLocalStorageValue(value);
}


export const setLocalStorageItem = (key: string, value: number): void => {
  const stringifiedValue = stringifyLocalStorageValue(value);
  window.localStorage.setItem(key, stringifiedValue);
}