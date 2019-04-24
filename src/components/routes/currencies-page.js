import React from 'react'
import SecondaryCurrenciesList from '../currencies/secondary-currencies-list'
import PrimaryCurrenciesList from '../currencies/primary-currencies-list'

function CurrenciesPage() {
  return (
    <>
      <SecondaryCurrenciesList />
      <PrimaryCurrenciesList />
    </>
  )
}

export default CurrenciesPage
