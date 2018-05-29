import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { observer, inject } from 'mobx-react'
import { YMMLoading, YMMTab } from '../../components'
import OrderList from './components/OrderList'
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
      },
      {
        text: '全部订单'
      },
      {
        text: '待评论'
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

  getRandomArray = (length) => {
    const { list } = this.store
    let tempArr = []
    if (list && list.length) {
      while (tempArr.length < 50) {
        const random = Math.floor(Math.random() * list.length)
        if (!tempArr.includes(list[random])) {
          tempArr.push(list[random])
        }
      }
    }
    return tempArr
  }

  renderList() {
    const { list } = this.store 
    const { currentIndex } = this.state
    let tempList = []
    switch (currentIndex) {
      case 0:
        tempList = this.getRandomArray(4)
        break
      case 1:
        tempList = this.getRandomArray(10)
        break
      case 2:
        tempList = this.getRandomArray(3)
        break
      case 3:
        tempList = this.getRandomArray(6)
        break
      case 4:
        tempList = this.getRandomArray(3)
        break
      case 5:
        tempList = this.getRandomArray(9)
        break
    }

    return (
      <OrderList
        dataList={tempList}>
      </OrderList>
    )
  }

  render() {
    const { text, num, list, loading } = this.store
    const { dataList, currentIndex } = this.state
    console.log('loading:', loading)
    return (
      <View style={styles.container}>
        <YMMTab currentIndex={currentIndex} dataList={dataList} callback={this.handleTabChange} />
        {this.renderList()}
        <YMMLoading visible={loading} color='#ff0' />
        <Button primary onPress={() => this.store.plus()} title='add'>
        </Button>
        <Text>{num}</Text>
        <Button primary onPress={() => this.store.getReactList()} title='getReactList'>
        </Button>
      </View>

    )
  }
}
