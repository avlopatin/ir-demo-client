import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CurrenciesPage from './currencies-page'
import CurrencyPage from './currency-page'

class DashboardPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Route path="/" exact component={CurrenciesPage} />
        <Route path="/currencies" exact component={CurrenciesPage} />
        <Route path="/currencies/:id" exact component={CurrencyPage} />
      </div>
    )
  }
}

export default DashboardPage
