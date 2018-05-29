/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import { YMMButton, YMMDialog } from '../../components'
import { Button } from 'antd-mobile'
import styles from './styles'

export default class App extends Component<Props> {
  state = {
    showDialog: false
  }

  handleShowDialog = () => {
    this.setState({
      showDialog: true
    })
  }

  handleHideDialog = () => {
    this.setState({
      showDialog: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <YMMDialog visible={this.state.showDialog} closeCallback={this.handleHideDialog} />
        <YMMButton callback={this.handleShowDialog} text='Show Dialog' />
        <Button>Test</Button>
      </View>
    )
  }
}
