import React, { memo } from 'react'

const CurrencyName = ({ currency }) => (
  <>{currency && currency.toLocaleUpperCase()}</>
)
export default memo(CurrencyName)
