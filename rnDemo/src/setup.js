import React from 'react'
import { Provider } from 'mobx-react'
import Shipper from './containers/NavigatorDemo'
import store from './store'

export default class Root extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <Shipper />
      </Provider>
    )
  }
}
