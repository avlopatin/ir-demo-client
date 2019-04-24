import React from 'react'
import { connect } from 'react-redux'
import { secondaryCurrenciesSelector } from '../../ducks/currencies'
import CurrencyButton from '../common/currency-button'
import { changeSelectedSecondaryCurrency } from '../../ducks/settings'

function SecondaryCurrenciesList({
  secondaryCurrencies,
  changeSelectedSecondaryCurrency
}) {
  function renderRow(secondaryCurrency) {
    return (
      <div key={secondaryCurrency.name}>
        {
          <CurrencyButton
            currency={secondaryCurrency}
            onClick={changeSelectedSecondaryCurrency}
          />
        }
      </div>
    )
  }

  return (
    <div className="row">
      {secondaryCurrencies &&
        secondaryCurrencies.map((currency) => renderRow(currency))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  secondaryCurrencies: secondaryCurrenciesSelector(state)
})

const mapDispatchToProps = {
  changeSelectedSecondaryCurrency
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryCurrenciesList)
