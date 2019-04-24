import React, { memo } from 'react'
import TimeAgo from 'timeago-react'
import TradeSideIcon from '../common/trade-side-icon'
import OfferRow from '../common/offer-row'

function TradeRow({ trade }) {
  return (
    <tr key={trade.guid}>
      <td>
        <TradeSideIcon side={trade.side} />
        &nbsp;
        <TimeAgo datetime={trade.date} />
      </td>
      <OfferRow
        primaryCurrency={trade.primaryCurrency}
        seconaryCurrency={trade.secondaryCurrency}
        price={trade.price}
        volume={trade.volume}
      />
    </tr>
  )
}

export default memo(TradeRow)
