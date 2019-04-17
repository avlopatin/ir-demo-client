import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import store from './redux'
import history from './history'

import App from './app'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
