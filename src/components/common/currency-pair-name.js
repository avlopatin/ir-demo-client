import React, { memo } from 'react'
import CurrencyName from './currency-name'

const CurrencyPairName = ({ primaryCurrency, secondaryCurrency }) => {
  return (
    <>
      <CurrencyName currency={primaryCurrency} />/
      <CurrencyName currency={secondaryCurrency} />
    </>
  )
}

export default memo(CurrencyPairName)
