import { all } from 'redux-saga/effects'
import { saga as currenciesSaga } from '../ducks/currencies'
import { saga as settingsSaga } from '../ducks/settings'

export default function* rootSaga() {
  yield all([settingsSaga(), currenciesSaga()])
}
