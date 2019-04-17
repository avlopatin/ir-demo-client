import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initSettings } from '../ducks/settings'

class Hello extends Component {
  componentDidMount() {
    const { initSettings } = this.props
    initSettings()
  }

  render() {
    return <>Hello</>
  }
}

export default connect(
  null,
  { initSettings }
)(Hello)
