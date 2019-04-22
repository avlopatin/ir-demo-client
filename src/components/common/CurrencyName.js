import React, { memo } from 'react'

function CurrencyName({ currency }) {
  return <>{currency.name.toLocaleUpperCase()}</>
}

export default memo(CurrencyName)
