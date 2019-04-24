import React, { memo } from 'react'

function CurrencyName({ currency }) {
  return <>{currency.toLocaleUpperCase()}</>
}

export default memo(CurrencyName)
