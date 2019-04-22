import { put, all, takeEvery, call } from 'redux-saga/effects'
import { appName, AUD_CURRENCY, XBT_CURRENCY } from '../config'
import { initCurrenciesSaga } from './currencies'
import { monitorTradesSaga } from './trades'

/**
 * Constants
 */
export const moduleName = 'settings'
export const prefix = `${appName}/${moduleName}`

export const INIT_SETTINGS_REQUEST = `${prefix}/INIT_SETTINGS_REQUEST`
export const INIT_SETTINGS_START = `${prefix}/INIT_SETTINGS_START`
export const INIT_SETTINGS_SUCCESS = `${prefix}/INIT_SETTINGS_SUCCESS`

/**
 * Reducer
 */
const initialState = {
  primaryCurrency: XBT_CURRENCY,
  secondaryCurrency: AUD_CURRENCY
}
export default function reducer(state = initialState, action) {
  return state
}

/**
 * Selectors
 */

/**
 * Action Creators
 */
export const initSettings = () => ({
  type: INIT_SETTINGS_REQUEST
})

/**
 * Sagas
 */
export function* initSettingsSaga() {
  yield put({
    type: INIT_SETTINGS_START
  })

  yield call(initCurrenciesSaga)

  yield call(monitorTradesSaga)

  yield put({
    type: INIT_SETTINGS_SUCCESS
  })
}

export function* saga() {
  yield all([takeEvery(INIT_SETTINGS_REQUEST, initSettingsSaga)])
}
