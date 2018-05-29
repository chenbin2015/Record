import React, {PureComponent} from 'react'
import { View, FlatList, Text, RefreshControl } from 'react-native'
import styles from './styles'

export default class OrderList extends PureComponent {
  state = {
    refreshing: false,
    dataSource: [],
    isLoreMoreing: 'LoreMoreEmpty'

  }
  renderItem(item, index) {
    return (
      <View>
        <Text>{index}.{item.data.author}</Text>
      </View>
    )
  }

     Refresh = () => {
       this.setState({
         refreshing: true
       })

       setTimeout(() => {
         this.setState({
           refreshing: false
         })
       }, 2000)
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

    render() {
      const { dataList } = this.props
      console.log('dataList:', dataList)
      return (
        <View style={styles.orderList}>
          <FlatList
            data={dataList}
            renderItem={({item, index}) => this.renderItem(item, index)}
            onEndReachedThreshold={0.01}// 执行上啦的时候10%执行
            ListFooterComponent={this.renderFooter}// 尾巴 
            onEndReached={() => { console.log('end') }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.Refresh}
                title="放手刷新..."/>
            }
          >
          </FlatList>
        </View>
      )
    }
}
