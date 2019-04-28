import React from 'react'
import OrderBookRow from './orderbook-row'
import NoDataRow from '../common/no-data-row'

function OrderBookSide({ name, orders }) {
  console.log(name, orders)
  function renderOrders() {
    if (!orders || orders.length === 0) {
      return <NoDataRow colSpan={3} />
    }
    return orders.map((order) => (
      <OrderBookRow order={order} key={order.guid} />
    ))
  }
  return (
    <div className="card">
      <div className="card-header card-header-primary">
        <h4 className="card-title">{name}</h4>
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
