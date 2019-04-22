import React, { useEffect } from 'react'
import DashboardPage from './components/routes/dashboard-page'
import { connect } from 'react-redux'
import { initSettings } from './ducks/settings'
function App(props) {
  useEffect(() => {
    const { initSettings } = props
    initSettings()
  }, [])

  return (
    <div>
      <div
        className="sidebar"
        data-color="purple"
        data-background-color="black"
        data-image="./assets/img/sidebar-2.jpg"
      >
        <div className="logo">link</div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active">link</li>
          </ul>
        </div>
      </div>
      <div className="main-panel">
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div className="container-fluid">
            <div className="navbar-wrapper">
              <a className="navbar-brand" href="javascript:void(0)">
                Dashboard
              </a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon icon-bar" />
              <span className="navbar-toggler-icon icon-bar" />
              <span className="navbar-toggler-icon icon-bar" />
            </button>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <i className="material-icons">notifications</i>
                    <p className="d-lg-none d-md-block">Notifications</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="content">
          <div className="container-fluid">
            <DashboardPage />
          </div>
        </div>
        <footer className="footer" />
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  initSettings
}
export default connect(
  null,
  mapDispatchToProps
)(App)
