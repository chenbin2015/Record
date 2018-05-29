/**
 * Created by cj on 2017/10/26.
 */
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation
} from 'react-native'

var screenW = Dimensions.get('window').width
var screenH = Dimensions.get('window').height

var anima = {
  duration: 1000, // 持续时间
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY
  },
  update: {
    type: 'easeOut'
  }
}

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 200,
      height: 100,
      left: 100,
      top: 20
    }
  }

  _clickStartAnimation() {
    LayoutAnimation.configureNext(anima, () => {
      this.setState({
        top: 20
      })
    })
    this.setState({
      top: this.state.top + 200
    })
  }

  _setTimer() {
    // 创建定时器
    this._clickStartAnimation()
    this.timer = setInterval(this._clickStartAnimation.bind(this), 1200)
  }

  render() {
    return (
      <View style={styles.mainStyle}>
        <Image style={{width: this.state.width, height: this.state.height, position: 'absolute', left: this.state.left, top: this.state.top}}
          source={{uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527056368444&di=675afbb1982c56282077da6c71252a26&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F810a19d8bc3eb13557adc2bcac1ea8d3fd1f444a.jpg'}}>
        </Image>
        <View style={{
          width: 240,
          height: 120,
          position: 'absolute',
          left: 80,
          top: 200,
          backgroundColor: 'red'
        }}>
          <Text style={{color: '#FFD700', fontSize: 90, lineHeight: 104, width: 240, textAlign: 'center'}}>红包</Text>
        </View>
        <TouchableOpacity style={{width: 200, height: 50, backgroundColor: 'yellow', marginTop: 40}} onPress={this._setTimer.bind(this)}>
          <Text style={{width: 200, height: 50, textAlign: 'center', lineHeight: 50}}>魔法现金</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    width: screenW,
    backgroundColor: "#1ab9af",
    justifyContent: 'center',
    alignItems: 'center'
  }
})