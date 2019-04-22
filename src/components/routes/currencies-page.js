import React, { Component } from 'react'
import CurrenciesList from '../currencies/currencies-list'

class CurrenciesPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <CurrenciesList />
      </div>
    )
  }
}

export default CurrenciesPage
