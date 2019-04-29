import React from 'react'
import { connect } from 'react-redux'
import { tradesPageSelector, tradesPageIndexChanged } from '../../ducks/trades'
import TradeRow from './trade-row'
import CurrencyPairName from '../common/currency-pair-name'
import NoDataRow from '../common/no-data-row'
import Pagination from '../common/pagination'

function TradesTable({
  tradesPage,
  primaryCurrency,
  secondaryCurrency,
  tradesPageIndexChanged
}) {
  function renderTrades() {
    const { items } = tradesPage
    if (!items || items.length === 0) {
      return <NoDataRow colSpan={4} />
    }
    return items.map((trade) => <TradeRow trade={trade} key={trade.guid} />)
  }

  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <h4 className="card-title">
          Last trades
          <span className="pull-right">
            {
              <Pagination
                page={tradesPage}
                paginationHandler={tradesPageIndexChanged}
              />
            }
          </span>
        </h4>
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
  tradesPage: tradesPageSelector(state, primaryCurrency, secondaryCurrency)
})

const mapDispatchToProps = {
  tradesPageIndexChanged
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradesTable)
