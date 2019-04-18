class Api {
  loadCurrencies = (isPrimary) => {
    const url = isPrimary
      ? '/Public/GetValidPrimaryCurrencyCodes'
      : '/Public/GetValidSecondaryCurrencyCodes'

    return fetch(url)
      .then((res) => res.json())
      .then((res) =>
        res.map((name) => {
          return { name, isPrimary }
        })
      )
  }
}

export default new Api()
