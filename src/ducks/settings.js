import { put, all, takeEvery } from 'redux-saga/effects'
import { produce } from 'immer'
import { appName, AUD_CURRENCY, XBT_CURRENCY } from '../config'
import { initCurrencies } from './currencies'

/**
 * Constants
 */
export const moduleName = 'settings'
export const prefix = `${appName}/${moduleName}`

export const INIT_REQUEST = `${prefix}/INIT_REQUEST`
export const INIT_START = `${prefix}/INIT_START`
export const INIT_SUCCESS = `${prefix}/INIT_SUCCESS`

/**
 * Reducer
 */
const initialState = {
  primaryCurrency: XBT_CURRENCY,
  secondaryCurrency: AUD_CURRENCY
}
export default function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    const { type, payload } = action
    switch (type) {
    }
  })
}

/**
 * Selectors
 */

/**
 * Action Creators
 */
export const initSettings = () => ({
  type: INIT_REQUEST
})

/**
 * Sagas
 */
export function* initSettingsSaga() {
  yield put({
    type: INIT_START
  })

  yield put(initCurrencies())

  yield put({
    type: INIT_SUCCESS
  })
}

export function* saga() {
  yield all([takeEvery(INIT_REQUEST, initSettingsSaga)])
}
