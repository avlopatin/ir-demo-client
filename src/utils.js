export const parseCurrencyPair = (pair) => {
  const splitChar = '-'
  if (pair && pair.indexOf(splitChar) >= 0) {
    const currencies = pair.split(splitChar)
    return {
      primary: normalizeCurrencyName(currencies[0]),
      secondary: normalizeCurrencyName(currencies[1])
    }
  }

  return {
    primary: null,
    secondary: null
  }
}

export const normalizeCurrencyName = (name) =>
  name ? name.toLocaleLowerCase().trim() : null
