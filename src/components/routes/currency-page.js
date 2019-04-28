import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { selectedSecondaryCurrency } from '../../ducks/settings'
import TradesTable from '../trades/trades-table'
import OrderBook from '../orderbook'
import Spread from '../spread'

function CurrencyPage({ secondaryCurrency, match }) {
  const [primaryCurrency, setPrimaryCurrency] = useState('')
  useEffect(() => {
    const { params } = match
    if (params && params.id) setPrimaryCurrency(params.id)
  }, [])

  return (
    <div>
      <div className="row">
        <div className="col-md-5">
          <TradesTable
            primaryCurrency={primaryCurrency}
            secondaryCurrency={secondaryCurrency}
          />{' '}
        </div>
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12">
              <Spread
                primaryCurrency={primaryCurrency}
                secondaryCurrency={secondaryCurrency}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <OrderBook
                primaryCurrency={primaryCurrency}
                secondaryCurrency={secondaryCurrency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  secondaryCurrency: selectedSecondaryCurrency(state)
})

export default connect(mapStateToProps)(CurrencyPage)
