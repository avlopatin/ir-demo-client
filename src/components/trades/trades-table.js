import React from 'react'
import { connect } from 'react-redux'
import { currencyPairTradesSelector } from '../../ducks/trades'
import TradeRow from './trade-row'
import CurrencyPairName from '../common/currency-pair-name'
import NoDataRow from '../common/no-data-row'

function TradesTable({ trades, primaryCurrency, secondaryCurrency }) {
  function renderTrades() {
    if (!trades) {
      return <NoDataRow colSpan={4} />
    }
    return trades.map((trade) => <TradeRow trade={trade} key={trade.guid} />)
  }

  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <h4 className="card-title">Last trades</h4>
        <p className="card-category">
          {
            <CurrencyPairName
              primaryCurrency={primaryCurrency}
              secondaryCurrency={secondaryCurrency}
            />
          }
        </p>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead className=" text-primary">
              <tr>
                <th>Time ago</th>
                <th>Price</th>
                <th>Volume</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{renderTrades()}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, { primaryCurrency, secondaryCurrency }) => ({
  trades: currencyPairTradesSelector(state, primaryCurrency, secondaryCurrency)
})

export default connect(mapStateToProps)(TradesTable)
