import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import currenciesReducer, {
  moduleName as currenciesModule
} from '../ducks/currencies'

export default combineReducers({
  router: connectRouter(history),
  [currenciesModule]: currenciesReducer
})
