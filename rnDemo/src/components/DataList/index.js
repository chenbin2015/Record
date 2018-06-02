import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList
} from 'react-native'
import styles from './styles'

 /*
  des: 支持上拉加载更多，下拉刷新的列表
  author: chenbin
 */
export default class DataList extends Component {
  state = {
  }

  componentDidMount() {
  }
  

  render() {
    const { dataList, index } = this.props
    const { currentIndex } = this.state
    return (
      <FlatList style={styles.list}>
       
      </FlatList>
    )
  }
}

Tab.propTypes = {
  dataList: PropTypes.array, // tab数组
  index: PropTypes.number, // 当前选中的索引
  callback: PropTypes.func // 点击之后的回调
}

Tab.defaultProps = {
  dataList: [{
    text: '运满满'
  }],
  currentIndex: 1,
  callback: () => {}
}
