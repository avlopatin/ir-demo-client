import React, { memo } from 'react'
import CurrencyName from './currency-name'
import { DECIMAL_PLACES } from '../../config'

function Volume({ currency, volume }) {
  const renderVolume = () => (
    <>
      <CurrencyName currency={currency} /> {volume}
    </>
  )
  return <>{volume == null ? '-' : renderVolume()}</>
}

export default memo(Volume)
