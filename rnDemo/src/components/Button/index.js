import React, { PureComponent } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import styles from './styles'

export default class RNButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, callback } = this.props
    console.log('styles.button:', styles.button)
    return (
      <TouchableHighlight onPress={callback}>
        <Text style={styles.button}>{text}</Text>
      </TouchableHighlight>
    )
  }
}

RNButton.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func
}

RNButton.defaultProps = {
  text: 'confirm',
  callback: () => {}
}
