import React, { memo } from 'react'
import OfferRow from '../common/offer-row'

function OrderBookRow({ order }) {
  return (
    <tr key={order.guid}>
      <OfferRow
        primaryCurrency={order.primaryCurrency}
        secondaryCurrency={order.secondaryCurrency}
        price={order.price}
        volume={order.volume}
      />
    </tr>
  )
}

export default memo(OrderBookRow)
