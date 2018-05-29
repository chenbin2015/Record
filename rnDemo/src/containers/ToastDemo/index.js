import React, { Component } from 'react'
import { Modal, Text, Alert as RNAlert, Button, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { YMMToast } from '../../components'

export default class Alert extends Component {
  state = {
    text: '服务异常，请稍后再试！',
    visible: false,
    icon: '',
    position: '',
    onClose: null
  }

  handleNormalClick = () => {
    this.setState({
      text: '居中的Toast',
      visible: true,
      icon: 'none',
      position: '',
      onClose: null
    })
  }

  handleBottomClick = () => {
    this.setState({
      text: '您还未登录，即将跳转到登录页',
      visible: true,
      icon: 'none',
      position: 'bottom',
      onClose: () => {
        alert('登录成功')
        console.log('toast end')
      }
    })
  }

  handleManyTextClick = () => {
    this.setState({
      text: '我是很多文字的toast，查看效果是什么样子的',
      visible: true,
      icon: 'none',
      position: '',
      onClose: null
    })
  }

  handleSuccessClick = () => {
    this.setState({
      text: '操作成功!',
      visible: true,
      icon: 'success',
      onClose: null
    })
  }

  handleWarningClick = () => {
    this.setState({
      text: '您还未登录!',
      visible: true,
      icon: 'warning',
      onClose: null
    })
  }

  handleErrorClick = () => {
    this.setState({
      text: '服务异常',
      visible: true,
      icon: 'error',
      onClose: null
    })
  }

  render() {
    const { text, visible, icon, position, onClose } = this.state
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ScrollView style={{height: 5000}}>
          <Button title="Bottom Toast" onPress={this.handleBottomClick}></Button>
          <Button title="Normal Toast" onPress={this.handleNormalClick}></Button>
          <Button title="Too much words in Toast" onPress={this.handleManyTextClick}></Button>
          <Button title="Success Toast" onPress={this.handleSuccessClick}></Button>
          <Button title="Warning Toast" onPress={this.handleWarningClick}></Button>
          <Button title="Error Toast" onPress={this.handleErrorClick}></Button>
        </ScrollView>
        <YMMToast
          text={text}
          visible={visible}
          icon={icon}
          position={position}
          onClose={onClose}
        ></YMMToast>
      </View>
    )
  }
}
