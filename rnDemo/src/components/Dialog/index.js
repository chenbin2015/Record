import React, { PureComponent } from 'react'
import { Text, TouchableHighlight, View, Model } from 'react-native'
import styles from './styles'

export default class Dialog extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { visible, closeCallback } = this.props
    if (visible) {
      return (
        <View style={styles.dialog}>
          <TouchableHighlight style={styles.content} onPress={closeCallback}>
            <Text>关闭</Text>
          </TouchableHighlight>
        </View>
      )
    }
    return null
  }
}