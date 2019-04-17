import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import history from '../history'
import reducer from './reducer'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history))

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

export default store
