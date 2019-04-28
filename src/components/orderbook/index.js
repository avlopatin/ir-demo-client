import React from 'react'
import { connect } from 'react-redux'
import {
  offersPageSelector,
  bidsPageSelector,
  bidsPageIndexChanged,
  offersPageIndexChanged
} from '../../ducks/orderbook'
import CurrencyPairName from '../common/currency-pair-name'
import OrderBookSide from './orderbook-side'

function OrderBook({
  primaryCurrency,
  secondaryCurrency,
  bidsPage,
  offersPage,
  bidsPageIndexChanged,
  offersPageIndexChanged
}) {
  const renderOrderBook = () => (
    <div className="row">
      <div className="col-md-6">{renderBids()}</div>
      <div className="col-md-6">{renderOffers()}</div>
    </div>
  )

  const renderOffers = () =>
    renderBookSide('Sellers', offersPage, offersPageIndexChanged)
  const renderBids = () =>
    renderBookSide('Buyers', bidsPage, bidsPageIndexChanged)

  const renderBookSide = (name, page, paginationHandler) => {
    return (
      <OrderBookSide
        page={page}
        name={name}
        paginationHandler={paginationHandler}
      />
    )
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
  offersPage: offersPageSelector(state, primaryCurrency, secondaryCurrency),
  bidsPage: bidsPageSelector(state, primaryCurrency, secondaryCurrency)
})

const mapDispatchToProps = {
  bidsPageIndexChanged,
  offersPageIndexChanged
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook)
