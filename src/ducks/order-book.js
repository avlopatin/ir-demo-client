import { appName } from '../config'
import { Map, Record } from 'immutable'
import { buildOrderBookChannel } from '../services/sockets'
import {
  primaryCurrenciesSelector,
  secondaryCurrenciesSelector
} from './currencies'
import Socket from '../services/sockets'
import { put, select, call, take } from 'redux-saga/effects'
import { parseCurrencyPair } from '../utils'

/**
 * Constants
 */
export const moduleName = 'orderbook'
export const prefix = `${appName}/${moduleName}`
const WS_EVENT_ORDER_CREATED = 'NewOrder'
const WS_EVENT_ORDER_CANCELLED = 'OrderCanceled'
const WS_EVENT_ORDER_CHANGED = 'OrderChanged'
export const ORDER_BOOK_MONITOR_START = `${prefix}/ORDER_BOOK_MONITOR_START`
export const ORDER_BOOK_ORDER_CREATED = `${prefix}/ORDER_BOOK_ORDER_CREATED`
export const ORDER_BOOK_ORDER_CANCELLED = `${prefix}/ORDER_BOOK_ORDER_CANCELLED`
export const ORDER_BOOK_ORDER_CHANGED = `${prefix}/ORDER_BOOK_ORDER_CHANGED`
/**
 * Reducer
 */
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
  entities: defaultOrders
})
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ORDER_BOOK_ORDER_CREATED:
      return state.mergeDeepIn(toEntityId(payload), toEntities([payload]))
    case ORDER_BOOK_ORDER_CANCELLED:
      return state.removeIn([...toEntityId(payload), payload.guid])
    case ORDER_BOOK_ORDER_CHANGED:
      return state.updateIn(
        [...toEntityId(payload), payload.guid, 'volume'],
        (volume) => payload.volume
      )
  }
  return state
}

const toEntityId = (order) => [
  'entities',
  `${order.primaryCurrency}`,
  `${order.secondaryCurrency}`,
  `${order.type}`
]

const toEntities = (values) => {
  return new Map(values.map((val) => [val.guid, new OrderRecord(val)]))
}

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
