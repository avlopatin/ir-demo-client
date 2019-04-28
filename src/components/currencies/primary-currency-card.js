import React from 'react'
import { connect } from 'react-redux'
import TimeAgo from 'timeago-react'
import Price from '../common/price'
import CurrencyName from '../common/currency-name'
import CurrencyIcon from '../common/currency-icon'
import { lastTradeSelector } from '../../ducks/trades'
import { selectedSecondaryCurrency } from '../../ducks/settings'
import { push } from 'connected-react-router'

function PrimaryCurrencyCard({
  primaryCurrency,
  secondaryCurrency,
  lastTrade,
  openDetails
}) {
  function renderLastTradeTime() {
    if (!lastTrade) {
      return 'No last trade'
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
  const handleClick = () => openDetails(primaryCurrency)

  return (
    <div
      className="card card-stats currency-button"
      key={primaryCurrency}
      onClick={handleClick}
    >
      <div className="card-header card-header-success card-header-icon">
        <div className="card-icon">
          <CurrencyIcon currency={primaryCurrency} />
        </div>
        <p className="card-category">
          <strong>{<CurrencyName currency={primaryCurrency} />}</strong>
        </p>
        <h4 className="card-title">{renderLastTradePrice()}</h4>
      </div>
      <div className="card-footer">
        <div className="stats"> {renderLastTradeTime()}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, { primaryCurrency }) => {
  const secondaryCurrency = selectedSecondaryCurrency(state)
  const lastTrade = lastTradeSelector(state, primaryCurrency, secondaryCurrency)

  return {
    secondaryCurrency,
    lastTrade
  }
}

const mapDispatchToProps = {
  openDetails: (primaryCurrency) => push(`/currencies/${primaryCurrency}`)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryCurrencyCard)
