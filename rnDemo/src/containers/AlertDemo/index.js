'use strict'

import React, { Component } from 'react'

import {   
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

var alertMessage = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
                   'catalysts for change. Dynamically revolutionize.'

/**
 * Simple alert examples.
 */
export default class SimpleAlertExampleBlock extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage
          )}>
          <View style={styles.button}>
            <Text>Alert with message and default button</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')}
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with one button</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => console.log('OK Pressed!')}
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with two buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            'three buttons',
            [
              {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
              {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
              {text: 'Baz', onPress: () => console.log('Baz Pressed!')}
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with three buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Foo Title',
            alertMessage,
            '..............'.split('').map((dot, index) => ({
              text: 'Button ' + index,
              onPress: () => console.log('Pressed ' + index)
            }))
          )}>
          <View style={styles.button}>
            <Text>Alert with too many buttons</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10
  }
})
