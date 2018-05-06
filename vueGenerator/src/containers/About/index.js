import React, { Component } from 'react'
import Loadable from 'react-loadable'
import Loading from '../Loading'

const LoadableComponent = Loadable({
  loader: () => import('./entry'),
  loading: Loading,
});

export default class App extends Component {
  render() {
    return <LoadableComponent/>;
  }
}