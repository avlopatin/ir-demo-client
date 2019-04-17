import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import history from '../history'
import reducer from './reducer'
import saga from './saga'
import entitiesMiddleware from '../entities/middleware'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  entitiesMiddleware,
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

export default store
