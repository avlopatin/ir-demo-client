import React from 'react'
import { connect } from 'react-redux'
import CurrencyName from './currency-name'
import { isCurrencySelected } from '../../ducks/settings'

function CurrencyButton({ currency, classes, onClick, isCurrencySelected }) {
  const clazz = `btn btn-sm btn-${isCurrencySelected ? 'primary' : 'default'}`

  const handleClick = () => isCurrencySelected || onClick(currency)
  return (
    <button className={clazz} onClick={handleClick}>
      <CurrencyName currency={currency} />
    </button>
  )
}

const mapStateToProps = (state, { currency }) => ({
  isCurrencySelected: isCurrencySelected(state, currency)
})
export default connect(mapStateToProps)(CurrencyButton)
