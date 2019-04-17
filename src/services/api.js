class Api {
  loadCurrencies = (url, isPrimary) => {
    return fetch(url)
      .then((res) => res.json())
      .then((res) =>
        res.map((name) => {
          return { name, isPrimary }
        })
      )
  }

  loadPrimaryCurrencies = () => {
    return this.loadCurrencies('/Public/GetValidPrimaryCurrencyCodes', true)
  }

  loadSecondaryCurrencies = () => {
    return this.loadCurrencies('/Public/GetValidSecondaryCurrencyCodes', false)
  }
}

export default new Api()
