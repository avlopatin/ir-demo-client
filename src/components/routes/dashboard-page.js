import React from 'react'
import { Route } from 'react-router-dom'
import CurrenciesPage from './currencies-page'
import CurrencyPage from './currency-page'
import SecondaryCurrenciesList from '../currencies/secondary-currencies-list'

function DashboardPage() {
  return (
    <>
      <SecondaryCurrenciesList />
      <Route path="/" exact component={CurrenciesPage} />
      <Route path="/currencies" exact component={CurrenciesPage} />
      <Route path="/currencies/:id" exact component={CurrencyPage} />
    </>
  )
}

export default DashboardPage
