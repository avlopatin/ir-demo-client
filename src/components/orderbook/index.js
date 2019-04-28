import React from 'react'
import { connect } from 'react-redux'
import { offersSelector, bidsSelector } from '../../ducks/orderbook'
import CurrencyPairName from '../common/currency-pair-name'
import OrderBookSide from './orderbook-side'

function OrderBook({ primaryCurrency, secondaryCurrency, bids, offers }) {
  const renderOrderBook = () => (
    <div className="row">
      <div className="col-md-6">{renderBids()}</div>
      <div className="col-md-6">{renderOffers()}</div>
    </div>
  )

  const renderOffers = () => renderBookSide('Sellers', offers)
  const renderBids = () => renderBookSide('Buyers', bids)

  const renderBookSide = (name, orders) => {
    return <OrderBookSide orders={orders} name={name} />
  }
  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <h4 className="card-title">Order Book</h4>
        <p className="card-category">
          {
            <CurrencyPairName
              primaryCurrency={primaryCurrency}
              secondaryCurrency={secondaryCurrency}
            />
          }
        </p>
      </div>
      <div className="card-body">{renderOrderBook()}</div>
    </div>
  )
}

const mapStateToProps = (state, { primaryCurrency, secondaryCurrency }) => ({
  offers: offersSelector(state, primaryCurrency, secondaryCurrency),
  bids: bidsSelector(state, primaryCurrency, secondaryCurrency)
})
export default connect(mapStateToProps)(OrderBook)
