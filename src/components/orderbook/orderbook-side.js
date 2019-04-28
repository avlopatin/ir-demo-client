import React from 'react'
import OrderBookRow from './orderbook-row'
import NoDataRow from '../common/no-data-row'
import Pagination from '../common/pagination'

function OrderBookSide({ name, page, paginationHandler }) {
  function renderOrders() {
    const { items } = page
    if (!items || items.length === 0) {
      return <NoDataRow colSpan={3} />
    }
    return items.map((order) => <OrderBookRow order={order} key={order.guid} />)
  }
  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <h4 className="card-title">
          {name}
          <span className="pull-right">
            {<Pagination page={page} paginationHandler={paginationHandler} />}
          </span>
        </h4>
      </div>
      <div className="card-body">
        <table className="table order-book">
          <thead className="text-primary">
            <tr>
              <th>Price</th>
              <th>Volume</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{renderOrders()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderBookSide
