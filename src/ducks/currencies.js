import { put, all, takeEvery, call } from 'redux-saga/effects'
import { produce } from 'immer'
import { appName } from '../config'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'currencies'
export const prefix = `${appName}/${moduleName}`

export const FETCH_PRIMARY_CURRENCIES_REQUEST = `${prefix}/FETCH_PRIMARY_CURRENCIES_REQUEST`
export const FETCH_PRIMARY_CURRENCIES_START = `${prefix}/FETCH_PRIMARY_CURRENCIES_START`
export const FETCH_PRIMARY_CURRENCIES_SUCCESS = `${prefix}/FETCH_PRIMARY_CURRENCIES_SUCCESS`

export const FETCH_SECONDARY_CURRENCIES_REQUEST = `${prefix}/FETCH_SECONDARY_CURRENCIES_REQUEST`
export const FETCH_SECONDARY_CURRENCIES_START = `${prefix}/FETCH_SECONDARY_CURRENCIES_START`
export const FETCH_SECONDARY_CURRENCIES_SUCCESS = `${prefix}/FETCH_SECONDARY_CURRENCIES_SUCCESS`

/**
 * Reducer
 */
const initialState = {
  primary: [],
  secondary: []
}
export default function reducer(state = initialState, action) {
  // eslint-disable-line no-console
  return produce(state, (draft) => {
    const { type, payload } = action
    switch (type) {
      case FETCH_PRIMARY_CURRENCIES_SUCCESS:
        draft.primary = payload
        return

      case FETCH_SECONDARY_CURRENCIES_SUCCESS:
        draft.secondary = payload

      default:
    }
  })
}

/**
 * Selectors
 */

/**
 * Action Creators
 */
export const fetchPrimaryCurrencies = () => ({
  type: FETCH_PRIMARY_CURRENCIES_REQUEST
})

export const fetchSecondaryCurrencies = () => ({
  type: FETCH_SECONDARY_CURRENCIES_REQUEST
})

/**
 * Sagas
 */
export function* fetchCurrenciesSaga(apiMethod, onStart, onSuccess) {
  yield put({
    type: onStart
  })

  const data = yield call(apiMethod)

  yield put({
    type: onSuccess,
    payload: data
  })
}

export function* saga() {
  yield all([
    takeEvery(
      FETCH_PRIMARY_CURRENCIES_REQUEST,
      fetchCurrenciesSaga,
      api.loadPrimaryCurrencies,
      FETCH_PRIMARY_CURRENCIES_START,
      FETCH_PRIMARY_CURRENCIES_SUCCESS
    ),
    takeEvery(
      FETCH_SECONDARY_CURRENCIES_REQUEST,
      fetchCurrenciesSaga,
      api.loadSecondaryCurrencies,
      FETCH_SECONDARY_CURRENCIES_START,
      FETCH_SECONDARY_CURRENCIES_SUCCESS
    )
  ])
}
