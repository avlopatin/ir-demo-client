import { appName, PAGINATION_INDEX, PAGINATION_SIZE } from '../config'
import { put, call, take, select } from 'redux-saga/effects'
import Socket, { buildTickerChannel } from '../services/sockets'
import {
  primaryCurrenciesSelector,
  secondaryCurrenciesSelector
} from './currencies'
import { parseCurrencyPair } from '../utils'
import { Map, Record } from 'immutable'
import { createSelector } from 'reselect'
import {
  ORDER_BOOK_SIDE_PAGE_INDEX_CHANGED,
  ORDER_BOOK_SIDE_PAGE_SIZE_CHANGED,
  WS_ORDER_TYPE_LIMIT_BID,
  WS_ORDER_TYPE_LIMIT_OFFER
} from './orderbook/constants'
import { page } from '../common/models'

/**
 * Constants
 */
export const moduleName = 'trades'
export const prefix = `${appName}/${moduleName}`

export const TRADES_MONITOR_START = `${prefix}/TRADES_MONITOR_START`
const WS_EVENT_TRADE = 'Trade'
const TRADES_NEW_TRADE = `${prefix}/TRADES_NEW_TRADE`
export const TRADE_SIDE_BUY = 'Buy'
export const TRADE_SIDE_SELL = 'Sell'
export const TRADES_PAGE_INDEX_CHANGED = `${prefix}/TRADES_PAGE_INDEX_CHANGED`
export const TRADES_PAGE_SIZE_CHANGED = `${prefix}/TRADES_PAGE_SIZE_CHANGED`

/**
 * Reducer
 */

export const PaginationRecord = Record({
  index: 0,
  size: 0
})

export const defaultPagination = new PaginationRecord({
  index: PAGINATION_INDEX,
  size: PAGINATION_SIZE
})

const defaultTrades = new Map()
const TradeRecord = Record({
  guid: null,
  date: null,
  volume: null,
  price: null,
  primaryCurrency: null,
  secondaryCurrency: null,
  side: null
})
const ReducerRecord = Record({
  entities: defaultTrades,
  pagination: defaultPagination
})
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case TRADES_NEW_TRADE:
      return state.setIn(toEntityId(payload), new TradeRecord(payload))
    case TRADES_PAGE_INDEX_CHANGED:
      return state.updateIn(['pagination', 'index'], () => payload)
    case TRADES_PAGE_SIZE_CHANGED:
      return state.updateIn(['pagination', 'size'], () => payload)
  }
  return state
}

const toEntityId = (trade) => [
  'entities',
  `${trade.primaryCurrency}`,
  `${trade.secondaryCurrency}`,
  `${trade.guid}`
]

const wsResponseToTrade = ({
  TradeGuid,
  TradeDate,
  Volume,
  Price,
  Pair,
  Side
}) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  return new TradeRecord({
    guid: TradeGuid,
    date: TradeDate,
    volume: Volume,
    price: Price,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    side: Side
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

export const lastTradeSelector = createSelector(
  currencyPairEntitiesSelector,
  (trades) => {
    return trades ? trades.valueSeq().last() : null
  }
)

export const currencyPairTradesSelector = createSelector(
  currencyPairEntitiesSelector,
  (trades) => {
    return trades
      ? trades
          .valueSeq()
          .toArray()
          .reverse()
      : null
  }
)

const paginationSelector = createSelector(
  stateSelector,
  (state) => state.get('pagination')
)

export const tradesPageSelector = createSelector(
  [currencyPairTradesSelector, paginationSelector],
  (trades, pagination) => page(trades, pagination.size, pagination.index)
)

/**
 * Action Creators
 */
const newTrade = (trade) => ({
  type: TRADES_NEW_TRADE,
  payload: trade
})
export const tradesPageIndexChanged = (index) => ({
  type: TRADES_PAGE_INDEX_CHANGED,
  payload: index
})
/**
 * Sagas
 */
export function* startMonitoringTradesSaga() {
  yield put({
    type: TRADES_MONITOR_START
  })

  const state = yield select()
  const primaryCurrencies = primaryCurrenciesSelector(state)
  const secondaryCurrencies = secondaryCurrenciesSelector(state)

  const url = buildTickerChannel(primaryCurrencies, secondaryCurrencies)
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
      if (Event !== WS_EVENT_TRADE) {
        return
      }
      emit(newTrade(wsResponseToTrade(Data)))
    }
  })
}
