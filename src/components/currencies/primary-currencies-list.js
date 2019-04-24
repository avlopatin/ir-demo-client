import React from 'react'
import { connect } from 'react-redux'
import { primaryCurrenciesSelector } from '../../ducks/currencies'
import PrimaryCurrencyCard from './primary-currency-card'

function PrimaryCurrenciesList({ currencies }) {
  function renderRow(currency) {
    return (
      <div className="col-md-3" key={currency.name}>
        <PrimaryCurrencyCard primaryCurrency={currency} />
      </div>
    )
  }

  return (
    <div className="row">
      {currencies && currencies.map((currency) => renderRow(currency))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  currencies: primaryCurrenciesSelector(state)
})

export default connect(mapStateToProps)(PrimaryCurrenciesList)
