import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPrimaryCurrencies,
  fetchSecondaryCurrencies
} from '../ducks/currencies'

class Hello extends Component {
  componentDidMount() {
    const { fetchSecondaryCurrencies, fetchPrimaryCurrencies } = this.props
    fetchSecondaryCurrencies()
    fetchPrimaryCurrencies()
  }

  render() {
    return <>Hello</>
  }
}

export default connect(
  null,
  { fetchSecondaryCurrencies, fetchPrimaryCurrencies }
)(Hello)
