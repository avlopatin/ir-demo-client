import React from 'react'
import CurrencyName from '../common/currency-name'
import CurrencyIcon from '../common/currency-icon'

export default function CurrencyCard({ currency }) {
  return (
    <div className="card card-stats currency-button" key={currency.name}>
      <div className="card-header card-header-success card-header-icon">
        <div className="card-icon">
          <CurrencyIcon currency={currency} />
        </div>
        <p className="card-category">
          <strong>{<CurrencyName currency={currency} />}</strong>
        </p>
        <h3 className="card-title">-</h3>
      </div>
      <div className="card-footer">
        <div className="stats">-</div>
      </div>
    </div>
  )
}
