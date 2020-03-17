import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Internal from './app/internal'

/* redux */
import store from './shared/redux/store'
import { getUserInfo } from './shared/redux/client/profile/actions'

/* CSS */
import './shared/assets/less/app.less'

const render = (AppComponent: React.ElementType) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}

store.dispatch(getUserInfo('sample')).then((data) => {
  render(Internal)
})
