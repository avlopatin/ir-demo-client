import { put, all, takeEvery, call } from 'redux-saga/effects'
import { produce, original } from 'immer'
import { appName } from '../config'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'currencies'
export const prefix = `${appName}/${moduleName}`

export const INIT_CURRENCIES_REQUEST = `${prefix}/INIT_CURRENCIES_REQUEST`
export const FETCH_CURRENCIES_START = `${prefix}/FETCH_CURRENCIES_START`
export const FETCH_CURRENCIES_SUCCESS = `${prefix}/FETCH_CURRENCIES_SUCCESS`

/**
 * Reducer
 */
const initialState = {
  entities: []
}
export default function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    const { type, payload } = action
    switch (type) {
      case FETCH_CURRENCIES_SUCCESS:
        draft.entities = Object.assign(original(draft.entities), payload)
        break
      default:
        break
    }
  })
}

/**
 * Selectors
 */

/**
 * Action Creators
 */

export const initCurrencies = () => ({
  type: INIT_CURRENCIES_REQUEST
})

/**
 * Sagas
 */
export function* fetchCurrenciesSaga(isPrimary) {
  yield put({
    type: FETCH_CURRENCIES_START
  })

  const data = yield call(api.loadCurrencies, isPrimary)

  yield put({
    type: FETCH_CURRENCIES_SUCCESS,
    payload: data
  })
}

export function* initCurrenciesSaga() {
  yield fetchCurrenciesSaga(true)
  yield fetchCurrenciesSaga(false)
}

export function* saga() {
  yield all([takeEvery(INIT_CURRENCIES_REQUEST, initCurrenciesSaga)])
}
