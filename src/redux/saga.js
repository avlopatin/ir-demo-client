import { all } from 'redux-saga/effects'
import { saga as currenciesSaga } from '../ducks/currencies'

export default function* rootSaga() {
  yield all([currenciesSaga()])
}
