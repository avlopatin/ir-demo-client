import React, { memo } from 'react'
import CurrencyName from '../common/currency-name'
import { connect } from 'react-redux'
import { spreadSelector } from '../../ducks/orderbook/index'

function Index({ primaryCurrency, secondaryCurrency, spread }) {
  const renderSpread = () => (
    <>
      {spread || 'No data'}{' '}
      {spread && <CurrencyName currency={secondaryCurrency} />}
    </>
  )

  return (
    <div className="alert alert-success">
      <span>
        <h2>Spread: {renderSpread()}</h2>
      </span>
    </div>
  )
}

const mapStateToProps = (state, { primaryCurrency, secondaryCurrency }) => ({
  spread: spreadSelector(state, primaryCurrency, secondaryCurrency)
})
export default connect(mapStateToProps)(memo(Index))
