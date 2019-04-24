import React from 'react'
import { connect } from 'react-redux'
import CurrencyName from './currency-name'
import { isCurrencySelected } from '../../ducks/settings'

function CurrencyButton({ currency, onClick, isCurrencySelected }) {
  const clazz = `btn btn-sm btn-${isCurrencySelected ? 'primary' : 'default'}`
  function handleClick() {
    onClick(currency.name)
  }
  return (
    <button className={clazz} onClick={handleClick}>
      <CurrencyName currency={currency} />
    </button>
  )
}

const mapStateToProps = (state, { currency }) => ({
  isCurrencySelected: isCurrencySelected(state, currency.name)
})
export default connect(mapStateToProps)(CurrencyButton)
