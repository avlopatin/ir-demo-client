import React, { memo } from 'react'
import { TRADE_SIDE_BUY, TRADE_SIDE_SELL } from '../../ducks/trades'

const getIcon = (side) => {
  switch (side) {
    case TRADE_SIDE_BUY:
      return <i className="fa text-success fa-long-arrow-right" />
    case TRADE_SIDE_SELL:
      return <i className="fa text-danger fa-long-arrow-left" />
    default:
      return <i className="fa text-info fa-question" />
  }
}

const TradeSideIcon = ({ side }) => getIcon(side)
export default memo(TradeSideIcon)
