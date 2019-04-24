import React, { memo } from 'react'
import Price from './price'
import Volume from './volume'

function OfferRow({ primaryCurrency, secondaryCurrency, price, volume }) {
  const value = () => (price || 0) * (volume || 0)
  return (
    <>
      <td>
        <Price currency={secondaryCurrency} price={price} />
      </td>
      <td>
        <Volume currency={primaryCurrency} volume={volume} />
      </td>
      <td>
        <Price currency={secondaryCurrency} price={value()} />
      </td>
    </>
  )
}

export default memo(OfferRow)
