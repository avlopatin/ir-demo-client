import { appName } from '../config'
import { all, put } from 'redux-saga/effects'
/**
 * Constants
 */
export const moduleName = 'trades'
export const prefix = `${appName}/${moduleName}`

export const MONITOR_TRADES_START = `${prefix}/MONITOR_TRADES_START`

/**
 * Reducer
 */
export default function reducer(state = [], action) {
  const { type, payload } = action

  return state
}

/**
 * Selectors
 */
export const stateSelector = (state) => state[moduleName]

/**
 * Action Creators
 */

/**
 * Sagas
 */

export function* monitorTradesSaga() {
  put({
    action: MONITOR_TRADES_START
  })
}

export function* saga() {
  yield all([])
}
