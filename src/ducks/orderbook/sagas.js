import { put, select, call, take } from 'redux-saga/effects'
import {
  primaryCurrenciesSelector,
  secondaryCurrenciesSelector
} from '../currencies'
import { buildOrderBookChannel } from '../../services/sockets'
import Socket from '../../services/sockets'
import { orderCreated, orderCancelled, orderChanged } from './action-creators'
import {
  WS_EVENT_ORDER_CREATED,
  WS_EVENT_ORDER_CANCELLED,
  WS_EVENT_ORDER_CHANGED,
  ORDER_BOOK_MONITOR_START
} from './constants'
import {
  wsResponseToCancelledOrder,
  wsResponseToChangedOrder,
  wsResponseToNewOrder
} from './reducer'

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
          if (!Volume || Volume === 0) {
            emit(orderCancelled(wsResponseToCancelledOrder(Data)))
          } else {
            emit(orderChanged(wsResponseToChangedOrder(Data)))
          }
      }
    }
  })
}
