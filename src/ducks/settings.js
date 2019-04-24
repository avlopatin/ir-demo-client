import { put, all, takeEvery, call, fork } from 'redux-saga/effects'
import { appName, AUD_CURRENCY, XBT_CURRENCY } from '../config'
import { initCurrenciesSaga } from './currencies'
import { monitorTradesSaga } from './trades'
import { createSelector } from 'reselect'
import { Record } from 'immutable'

/**
 * Constants
 */
export const moduleName = 'settings'
export const prefix = `${appName}/${moduleName}`

export const INIT_SETTINGS_REQUEST = `${prefix}/INIT_SETTINGS_REQUEST`
export const INIT_SETTINGS_START = `${prefix}/INIT_SETTINGS_START`
export const INIT_SETTINGS_SUCCESS = `${prefix}/INIT_SETTINGS_SUCCESS`
export const SETTINGS_CHANGE_SELECTED_PRIMARY_CURRENCY = `${prefix}/SETTINGS_CHANGE_SELECTED_PRIMARY_CURRENCY`
export const SETTINGS_CHANGE_SELECTED_SECONDARY_CURRENCY = `${prefix}/SETTINGS_CHANGE_SELECTED_SECONDARY_CURRENCY`
/**
 * Reducer
 */

const ReducerRecord = Record({
  primaryCurrency: XBT_CURRENCY,
  secondaryCurrency: AUD_CURRENCY
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case SETTINGS_CHANGE_SELECTED_PRIMARY_CURRENCY:
      return state.set('primaryCurrency', payload)
    case SETTINGS_CHANGE_SELECTED_SECONDARY_CURRENCY:
      return state.set('secondaryCurrency', payload)
  }
  return state
}

/**
 * Selectors
 */
export const stateSelector = (state) => state[moduleName]
export const selectedPrimaryCurrency = createSelector(
  stateSelector,
  (state) => state.primaryCurrency
)
export const selectedSecondaryCurrency = createSelector(
  stateSelector,
  (state) => state.secondaryCurrency
)
const currencyNameSelector = (state, currencyName) => currencyName
export const isCurrencySelected = createSelector(
  currencyNameSelector,
  selectedPrimaryCurrency,
  selectedSecondaryCurrency,
  (currencyName, primary, secondary) => {
    return currencyName === primary || currencyName === secondary
  }
)
/**
 * Action Creators
 */
export const initSettings = () => ({
  type: INIT_SETTINGS_REQUEST
})

export const changeSelectedPrimaryCurrency = (primary) => ({
  type: SETTINGS_CHANGE_SELECTED_PRIMARY_CURRENCY,
  payload: primary
})

export const changeSelectedSecondaryCurrency = (secondary) => ({
  type: SETTINGS_CHANGE_SELECTED_SECONDARY_CURRENCY,
  payload: secondary
})

/**
 * Sagas
 */
export function* initSettingsSaga() {
  yield put({
    type: INIT_SETTINGS_START
  })

  yield call(initCurrenciesSaga)

  yield fork(monitorTradesSaga, AUD_CURRENCY)

  yield put({
    type: INIT_SETTINGS_SUCCESS
  })
}

export function* saga() {
  yield all([takeEvery(INIT_SETTINGS_REQUEST, initSettingsSaga)])
}
