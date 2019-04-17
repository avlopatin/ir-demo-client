import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import currenciesReducer, {
  moduleName as currenciesModule
} from '../ducks/currencies'
import settingsReducer, {
  moduleName as settingsModule
} from '../ducks/settings'

export default combineReducers({
  router: connectRouter(history),
  [currenciesModule]: currenciesReducer,
  [settingsModule]: settingsReducer
})
