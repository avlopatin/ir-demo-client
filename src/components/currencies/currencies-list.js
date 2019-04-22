import React from 'react'
import { connect } from 'react-redux'
import { primaryCurrenciesSelector } from '../../ducks/currencies'
import CurrencyCard from './currency-card'

function CurrenciesList({ primaryCurrencies }) {
  function renderRow(currency) {
    return (
      <div className="col-md-3" key={currency.name}>
        <CurrencyCard currency={currency} />
      </div>
    )
  }

  return (
    <div className="row">
      {primaryCurrencies &&
        primaryCurrencies.map((currency) => renderRow(currency))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  primaryCurrencies: primaryCurrenciesSelector(state)
})

export default connect(
  mapStateToProps,
  null
)(CurrenciesList)
