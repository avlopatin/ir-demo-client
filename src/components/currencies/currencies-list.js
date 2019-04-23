import React from 'react'
import { connect } from 'react-redux'
import { primaryCurrenciesSelector } from '../../ducks/currencies'
import CurrencyCard from './currency-card'

const secondaryCurrency = { name: 'aud', isPrimary: false }

function CurrenciesList({ primaryCurrencies }) {
  function renderRow(primaryCurrency) {
    return (
      <div className="col-md-3" key={primaryCurrency.name}>
        <CurrencyCard
          primaryCurrency={primaryCurrency}
          secondaryCurrency={secondaryCurrency}
        />
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

export default connect(mapStateToProps)(CurrenciesList)
