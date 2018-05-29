import React, {Component, PropTypes} from 'react'
import {
  View,
  Dimensions,
  ListView,
  TextInput,
  Image,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native'

let {width, height} = Dimensions.get('window')

export default class TestListPage2 extends Component {
  // 构造函数
  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      isLoreMoreing: 'LoreMoreing',
      dataSource: []

    }
    this.responseData = []
  }

  componentDidMount() {
    // this.Refresh();
    // 模拟请求后台返回的数据

  }

    Refresh = () => {
      this.setState({
        refreshing: true
      })

      setTimeout(() => {
        // 默认选中第二个
        this.responseData = [
          {id: 100}, {id: 101}, {id: 102}, {id: 103}, {id: 104}
        ]
        this.setState({
          refreshing: false,
          dataSource: this.responseData
        })
        this.isLoreMore = false
      }, 2000)
    }

    isLoreMore = false;
    LoreMore = () => {
      if (this.isLoreMore == false) {
        this.setState({
          isLoreMoreing: 'LoreMoreing'
        })

        this.isLoreMore = true
        this.responseData = this.responseData.concat({id: '加载的新数据'})
        setTimeout(() => {
          this.setState({
            dataSource: this.responseData
          })
        }, 500)

        setTimeout(() => {
          this.setState({
            isLoreMoreing: 'LoreMoreEmpty'
          })
        }, 500)
      }
    }

    render() {
      return (
        <View style={{flex: 1}}>
          <View style={{
            marginTop: 20,
            height: 44,
            width: width,
            justifyContent: 'center',
            backgroundColor: 'gray',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Text onPress={this.Refresh}>{'点击刷新     '}</Text>

            <Text onPress={() => {
              this._flatList.scrollToIndex({viewPosition: 0, index: 4})
            }}>{'点击滚动到第4个'}</Text>

          </View>
          <FlatList
            showsVerticalScrollIndicator={false}// 是否显示垂直滚动条
            showsHorizontalScrollIndicator={false}// 是否显示水平滚动条
            numColumns={1}// 每行显示1个
            ref={(flatList) => this._flatList = flatList}
            ListHeaderComponent={this.renderHeader}// 头部
            ListFooterComponent={this.renderFooter}// 尾巴
            renderItem={this.renderRow}// 每行显示一项
            ItemSeparatorComponent={this.renderSeparator}// 每行底部---一般写下划线
            enableEmptySections={true}// 数据可以为空
            keyExtractor={(item, index) => item.key = index}
            onEndReachedThreshold={0.1}// 执行上啦的时候10%执行
            onEndReached={this.LoreMore}
            data={this.state.dataSource}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.Refresh}
                title="Loading..."/>
            }
          />
        </View>
      )
    }

    renderRow = (item) => {
      let rowData = item.item
      let index = rowData.key
      return (
        <View style={{height: 150, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
          <Text>{rowData.id}</Text>
        </View>
      )
    }

    renderSeparator = () => {
      return (
        <View style={{height: 1, backgroundColor: 'rgb(200,200,200)'}}/>
      )
    }

    renderHeader = () => {
      return (
        <View style={{
          height: 44,
          width: width,
          justifyContent: 'center',
          backgroundColor: 'red',
          alignItems: 'center'
        }} activeOpacity={1}>
          <Text>{'我是头部'}</Text>
        </View>
      )
    }

    renderFooter = () => {
      if (this.state.dataSource.length != 0 && this.state.isLoreMoreing == 'LoreMoreing') {
        return (
          <View style={{
            height: 44,
            backgroundColor: 'rgb(200,200,200)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>{'正在加载....'}</Text>
          </View>
        )
      } else if (this.state.isLoreMoreing == 'LoreMoreEmpty') {
        return (
          <View style={{
            height: 44,
            backgroundColor: 'rgb(200,200,200)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text>{'暂无更多'}</Text>
          </View>
        )
      } else {
        return null
      }
    }
}