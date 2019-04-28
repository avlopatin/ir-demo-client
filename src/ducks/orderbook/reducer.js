import { parseCurrencyPair } from '../../utils'
import { Map, Record } from 'immutable'
import { PAGINATION_INDEX, PAGINATION_SIZE } from '../../config'
import {
  ORDER_BOOK_ORDER_CANCELLED,
  ORDER_BOOK_ORDER_CHANGED,
  ORDER_BOOK_ORDER_CREATED,
  ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED,
  WS_ORDER_TYPE_LIMIT_BID,
  WS_ORDER_TYPE_LIMIT_OFFER
} from './constants'

export const wsResponseToNewOrder = ({
  OrderGuid,
  Volume,
  Price,
  Pair,
  OrderType
}) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  return new OrderRecord({
    guid: OrderGuid,
    volume: Volume,
    price: Price,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    type: OrderType
  })
}

export const wsResponseToCancelledOrder = ({ OrderGuid, Pair, OrderType }) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  return new OrderRecord({
    guid: OrderGuid,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    type: OrderType
  })
}

export const wsResponseToChangedOrder = ({
  OrderGuid,
  Pair,
  OrderType,
  Volume
}) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  return new OrderRecord({
    guid: OrderGuid,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    type: OrderType,
    volume: Volume
  })
}

export const PaginationRecord = Record({
  type: null,
  index: 0,
  size: 0
})

export const defaultSidePagination = (type) =>
  new PaginationRecord({
    type: type,
    index: PAGINATION_INDEX,
    size: PAGINATION_SIZE
  })

export const defaultPagination = new Map({
  [`${WS_ORDER_TYPE_LIMIT_OFFER}`]: defaultSidePagination(
    WS_ORDER_TYPE_LIMIT_OFFER
  ),
  [`${WS_ORDER_TYPE_LIMIT_BID}`]: defaultSidePagination(WS_ORDER_TYPE_LIMIT_BID)
})

const defaultOrders = new Map()
export const OrderRecord = Record({
  guid: null,
  volume: null,
  price: null,
  primaryCurrency: null,
  secondaryCurrency: null,
  type: null
})
const ReducerRecord = Record({
  entities: defaultOrders,
  pagination: defaultPagination
})

const toPaginationId = ({ type }) => ['pagination', `${type}`]

const toEntityId = (order) => [
  'entities',
  `${order.primaryCurrency}`,
  `${order.secondaryCurrency}`,
  `${order.type}`,
  `${order.guid}`
]

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ORDER_BOOK_ORDER_CREATED:
      return state.setIn(toEntityId(payload), new OrderRecord(payload))
    case ORDER_BOOK_ORDER_CANCELLED:
      return state.removeIn(toEntityId(payload))
    case ORDER_BOOK_ORDER_CHANGED:
      return state.updateIn(
        [...toEntityId(payload), 'volume'],
        () => payload.volume
      )
    case ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED:
      return state.updateIn(
        [...toPaginationId(payload), 'index'],
        () => payload.index
      )
    case ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED:
      return state.updateIn(
        [...toPaginationId(payload), 'size'],
        () => payload.size
      )
  }
  return state
}
