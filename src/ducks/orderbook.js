import { appName, PAGINATION_INDEX, PAGINATION_SIZE } from '../config'
import { Map, Record } from 'immutable'
import { buildOrderBookChannel } from '../services/sockets'
import {
  primaryCurrenciesSelector,
  secondaryCurrenciesSelector
} from './currencies'
import Socket from '../services/sockets'
import { put, select, call, take } from 'redux-saga/effects'
import { parseCurrencyPair } from '../utils'
import { createSelector } from 'reselect'
import { page } from '../common/models'

/**
 * Constants
 */
export const moduleName = 'orderbook'
export const prefix = `${appName}/${moduleName}`
const WS_EVENT_ORDER_CREATED = 'NewOrder'
const WS_EVENT_ORDER_CANCELLED = 'OrderCanceled'
const WS_EVENT_ORDER_CHANGED = 'OrderChanged'
const WS_ORDER_TYPE_LIMIT_OFFER = 'LimitOffer'
const WS_ORDER_TYPE_LIMIT_BID = 'LimitBid'
export const ORDER_BOOK_MONITOR_START = `${prefix}/ORDER_BOOK_MONITOR_START`
export const ORDER_BOOK_ORDER_CREATED = `${prefix}/ORDER_BOOK_ORDER_CREATED`
export const ORDER_BOOK_ORDER_CANCELLED = `${prefix}/ORDER_BOOK_ORDER_CANCELLED`
export const ORDER_BOOK_ORDER_CHANGED = `${prefix}/ORDER_BOOK_ORDER_CHANGED`
export const ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED = `${prefix}/ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED`
export const ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED = `${prefix}/ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED`

/**
 * Reducer
 */

const PaginationRecord = Record({
  type: null,
  index: 0,
  size: 0
})

const defaultSidePagination = (type) =>
  new PaginationRecord({
    type: type,
    index: PAGINATION_INDEX,
    size: PAGINATION_SIZE
  })
const defaultPagination = new Map({
  [`${WS_ORDER_TYPE_LIMIT_OFFER}`]: defaultSidePagination(
    WS_ORDER_TYPE_LIMIT_OFFER
  ),
  [`${WS_ORDER_TYPE_LIMIT_BID}`]: defaultSidePagination(WS_ORDER_TYPE_LIMIT_BID)
})

const defaultOrders = new Map()
const OrderRecord = Record({
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

const toPaginationId = ({ type }) => ['pagination', `${type}`]

const toEntityId = (order) => [
  'entities',
  `${order.primaryCurrency}`,
  `${order.secondaryCurrency}`,
  `${order.type}`,
  `${order.guid}`
]

const wsResponseToNewOrder = ({
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

const wsResponseToCancelledOrder = ({ OrderGuid, Pair, OrderType }) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  return new OrderRecord({
    guid: OrderGuid,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    type: OrderType
  })
}

const wsResponseToChangedOrder = ({ OrderGuid, Pair, OrderType, Volume }) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  return new OrderRecord({
    guid: OrderGuid,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    type: OrderType,
    volume: Volume
  })
}

/**
 * Selectors
 */
const stateSelector = (state) => state[moduleName]

const currencyPairSelector = (state, primaryCurrency, secondaryCurrency) => {
  return {
    primaryCurrency,
    secondaryCurrency
  }
}

const currencyPairEntitiesSelector = createSelector(
  [stateSelector, currencyPairSelector],
  (state, { primaryCurrency, secondaryCurrency }) => {
    return state.getIn([
      'entities',
      `${primaryCurrency}`,
      `${secondaryCurrency}`
    ])
  }
)

const bidsSelector = createSelector(
  currencyPairEntitiesSelector,
  (entities) =>
    prepareOrderBookSide(
      entities,
      WS_ORDER_TYPE_LIMIT_BID,
      (a, b) => b.price - a.price
    )
)

const offersSelector = createSelector(
  currencyPairEntitiesSelector,
  (entities) =>
    prepareOrderBookSide(
      entities,
      WS_ORDER_TYPE_LIMIT_OFFER,
      (a, b) => a.price - b.price
    )
)

const prepareOrderBookSide = (entities, type, sortProcessor) => {
  if (!entities) return null
  const requiredData = entities.get(type)
  if (!requiredData) return null

  return requiredData
    .valueSeq()
    .toArray()
    .sort(sortProcessor)
}

const paginationSelector = createSelector(
  stateSelector,
  (state) => state.get('pagination')
)

const bidsPagination = createSelector(
  paginationSelector,
  (pagination) => {
    return pagination.get(WS_ORDER_TYPE_LIMIT_BID)
  }
)

const offersPagination = createSelector(
  paginationSelector,
  (pagination) => {
    return pagination.get(WS_ORDER_TYPE_LIMIT_OFFER)
  }
)

export const offersPageSelector = createSelector(
  [offersSelector, offersPagination],
  (offers, pagination) => page(offers, pagination.size, pagination.index)
)

export const bidsPageSelector = createSelector(
  [bidsSelector, bidsPagination],
  (bids, pagination) => page(bids, pagination.size, pagination.index)
)

/**
 * Action Creators
 */
const orderCreated = (order) => ({
  type: ORDER_BOOK_ORDER_CREATED,
  payload: order
})

const orderCancelled = (order) => ({
  type: ORDER_BOOK_ORDER_CANCELLED,
  payload: order
})

const orderChanged = (order) => ({
  type: ORDER_BOOK_ORDER_CHANGED,
  payload: order
})

export const bidsPageIndexChanged = (index) => ({
  type: ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  payload: {
    type: WS_ORDER_TYPE_LIMIT_BID,
    index
  }
})

export const offersPageIndexChanged = (index) => ({
  type: ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  payload: {
    type: WS_ORDER_TYPE_LIMIT_OFFER,
    index
  }
})

/**
 * Sagas
 */
export function* startMonitoringOrderBooksSaga() {
  yield put({
    type: ORDER_BOOK_MONITOR_START
  })

  const state = yield select()
  const primaryCurrencies = primaryCurrenciesSelector(state)
  const secondaryCurrencies = secondaryCurrenciesSelector(state)

  const url = buildOrderBookChannel(primaryCurrencies, secondaryCurrencies)
  const channel = yield call(createWsChannel, url)

  try {
    while (true) {
      const action = yield take(channel)
      yield put(action)
    }
  } catch (e) {}
}

function* createWsChannel(url) {
  return Socket.init({
    url,
    processMessage: (emit, msg) => {
      const { Event, Data } = msg
      switch (Event) {
        case WS_EVENT_ORDER_CREATED:
          emit(orderCreated(wsResponseToNewOrder(Data)))
          break
        case WS_EVENT_ORDER_CANCELLED:
          emit(orderCancelled(wsResponseToCancelledOrder(Data)))
          break
        case WS_EVENT_ORDER_CHANGED:
          const { Volume } = Data
          if (Volume === 0) {
            emit(orderCancelled(wsResponseToCancelledOrder(Data)))
          } else {
            emit(orderChanged(wsResponseToChangedOrder(Data)))
          }
      }
    }
  })
}
