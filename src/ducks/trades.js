import { appName } from '../config'
import { all, put, call, take, select } from 'redux-saga/effects'
import Socket, { buildTickerChannels } from '../services/sockets'
import {
  primaryCurrenciesSelector,
  secondaryCurrenciesSelector
} from './currencies'
import { parseCurrencyPair } from '../utils'
import { Map, Record } from 'immutable'
import { createSelector } from 'reselect'

/**
 * Constants
 */
export const moduleName = 'trades'
export const prefix = `${appName}/${moduleName}`

export const TRADES_MONITOR_START = `${prefix}/TRADES_MONITOR_START`
const WS_EVENT_TRADE = 'Trade'
const TRADES_NEW_TRADE = `${prefix}/TRADES_NEW_TRADE`

/**
 * Reducer
 */

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
  entities: defaultTrades
})
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case TRADES_NEW_TRADE:
      return state.mergeDeepIn(
        [
          'entities',
          `${payload.primaryCurrency}`,
          `${payload.secondaryCurrency}`
        ],
        toEntities([payload])
      )
  }
  return state
}

const toEntities = (values) => {
  return new Map(values.map((val) => [val.guid, new TradeRecord(val)]))
}

const wsResponseToTrade = ({
  TradeGuid,
  TradeDate,
  Volume,
  Price,
  Pair,
  Side
}) => {
  const { primary, secondary } = parseCurrencyPair(Pair)
  const trade = new TradeRecord({
    guid: TradeGuid,
    date: TradeDate,
    volume: Volume,
    price: Price,
    primaryCurrency: primary,
    secondaryCurrency: secondary,
    side: Side
  })
  return trade
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

/**
 * Action Creators
 */
const newTrade = (trade) => ({
  type: TRADES_NEW_TRADE,
  payload: trade
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

  const url = buildTickerChannels(primaryCurrencies, secondaryCurrencies)
  const channel = yield call(createWsChannel, url)

  try {
    while (true) {
      const { Data } = yield take(channel)
      yield put(newTrade(wsResponseToTrade(Data)))
    }
  } catch (e) {}
}

function* createWsChannel(url) {
  return Socket.init({
    url,
    processMessage: (emit, msg) => {
      const { Event } = msg
      if (Event !== WS_EVENT_TRADE) {
        return
      }
      emit(msg)
    }
  })
}

export function* saga() {
  yield all([])
}
