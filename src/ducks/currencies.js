import { put, all, takeEvery, call } from 'redux-saga/effects'
import { Record, OrderedMap } from 'immutable'
import { appName } from '../config'
import api from '../services/api'
import { createSelector } from 'reselect'

/**
 * Constants
 */
export const moduleName = 'currencies'
export const prefix = `${appName}/${moduleName}`

export const FETCH_CURRENCIES_START = `${prefix}/FETCH_CURRENCIES_START`
export const FETCH_CURRENCIES_SUCCESS = `${prefix}/FETCH_CURRENCIES_SUCCESS`
export const INIT_CURRENCIES_SUCCESS = `${prefix}/INIT_CURRENCIES_SUCCESS`

/**
 * Reducer
 */
const defaultCurrencies = new OrderedMap()
const ReducerRecord = Record({
  entities: defaultCurrencies
})
const CurrencyRecord = Record({
  name: null,
  isPrimary: null
})

const toEntities = (values) => {
  return new OrderedMap(
    values.map((val) => [val.name, new CurrencyRecord(val)])
  )
}

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_CURRENCIES_SUCCESS:
      return state.mergeDeep({ entities: toEntities(payload) })
    default:
      break
  }

  return state
}

/**
 * Selectors
 */
export const stateSelector = (state) => state[moduleName]
export const currenciesSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)
export const currenciesFilterSelector = (isPrimary) =>
  createSelector(
    currenciesSelector,
    (currencies, _) => currencies.filter((cur) => cur.isPrimary === isPrimary)
  )

export const primaryCurrenciesSelector = createSelector(
  currenciesFilterSelector(true),
  (currencies) => currencies
)

export const secondaryCurrenciesSelector = createSelector(
  currenciesFilterSelector(false),
  (currencies) => currencies
)

/**
 * Action Creators
 */

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

  yield put({
    type: INIT_CURRENCIES_SUCCESS
  })
}

export function* saga() {
  yield all([])
}
