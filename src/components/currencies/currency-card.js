import React from 'react'
import { connect } from 'react-redux'
import TimeAgo from 'timeago-react'
import Price from '../common/price'
import CurrencyName from '../common/currency-name'
import CurrencyIcon from '../common/currency-icon'
import { lastTradeSelector } from '../../ducks/trades'

function CurrencyCard({ primaryCurrency, secondaryCurrency, lastTrade }) {
  function renderLastTradeTime() {
    if (!lastTrade) {
      return
    }

    return (
      <>
        <i className="material-icons">access_time</i>{' '}
        <TimeAgo datetime={lastTrade.date} />
      </>
    )
  }

  function renderLastTradePrice() {
    if (!lastTrade) {
      return
    }

    return <Price price={lastTrade.price} currency={secondaryCurrency} />
  }

  return (
    <div className="card card-stats currency-button" key={primaryCurrency.name}>
      <div className="card-header card-header-success card-header-icon">
        <div className="card-icon">
          <CurrencyIcon currency={primaryCurrency} />
        </div>
        <p className="card-category">
          <strong>{<CurrencyName currency={primaryCurrency} />}</strong>
        </p>
        <h3 className="card-title">{renderLastTradePrice()}</h3>
      </div>
      <div className="card-footer">
        <div className="stats"> {renderLastTradeTime()}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, { primaryCurrency, secondaryCurrency }) => ({
  lastTrade: lastTradeSelector(
    state,
    primaryCurrency.name,
    secondaryCurrency.name
  )
})
export default connect(mapStateToProps)(CurrencyCard)
