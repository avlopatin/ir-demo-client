import React, { memo } from 'react'

const CurrencyName = ({ currency }) => <>{currency.toLocaleUpperCase()}</>
export default memo(CurrencyName)
