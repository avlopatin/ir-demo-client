import React, { memo } from 'react'
import CurrencyName from './currency-name'
import { DECIMAL_PLACES } from '../../config'

function Price({ currency, price }) {
  const renderPrice = () => (
    <>
      <CurrencyName currency={currency} /> {price.toFixed(DECIMAL_PLACES)}
    </>
  )
  return <span> {price == null ? '-' : renderPrice()}</span>
}

export default memo(Price)
