import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { observer, inject } from 'mobx-react'
import { YMMLoading, YMMTab } from '../../components'
import styles from './styles'

@inject(`dirverStore`) // 注入对应的store
@observer // 监听当前组件
export default class Driver extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.dirverStore // 通过props来导入访问已注入的store
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
      currentIndex: 0
    }
  }

  componentDidMount() {
    this.store.getReactList()
  }
  
  handleTabChange = index => {
    this.setState({
      currentIndex: index
    })
  }

  render() {
    const { dataList, currentIndex } = this.state
    return (
      <View style={styles.container}>
        <YMMTab currentIndex={currentIndex} dataList={dataList} callback={this.handleTabChange} />
        
      </View>

    )
  }
}
