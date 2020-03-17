import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserInfo } from '../../shared/redux/client/profile/actions'
import Home from './body/home'
import About from './body/About'

const Root = props => {
  const { pathname } = useLocation()
  useEffect(() => {
    props.getUserInfo()
  }, [])
  return (
    <div>
      { pathname }
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about/:profile' component={About} />
        </Switch>
      </div>

    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getUserInfo
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Root)