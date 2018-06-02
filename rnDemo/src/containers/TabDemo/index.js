import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { YMMTab } from '../../components'
import styles from './styles'

 /*
  des: tab组件的demo
  author: chenbin
 */
export default class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [{
        text: '待支付'
      },
      {
        text: '已支付'
      },
      {
        text: '已过期'
      },
      {
        text: '退货|售后'
      }],

      currentIndex: 1,
      isAverage: true
    }
  }

  // tab之后的回调
  handleTabChange = index => {
    alert(index)
  }

  handleAverage = (isAverage) => {
  	this.setState({
  		isAverage
  	})
  }

  handleChangeTab = () => {
  	this.setState({
  		currentIndex: 1
  	})
  }

  render() {
    const { dataList, currentIndex, isAverage } = this.state
    return (
      <View style={styles.container}>
        <YMMTab currentIndex={currentIndex} dataList={dataList} callback={this.handleTabChange} height={50} backgroundColor={'#ff0'} />
        <Button title="均分tab" onPress={() => { this.handleAverage(true) }} />
        <Button title="不均分tab" onPress={() => { this.handleAverage(false) }} />
        <Button title="动态设置选中的tab" onPress={() => { this.handleChangeTab(false) }} />
      </View>
    )
  }
}
