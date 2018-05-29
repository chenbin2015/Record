import React, { Component } from 'react'
import { Modal, Text, Alert as RNAlert, Button, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { YMMAlert } from '../../components'

export default class Alert extends Component {
  state = {
    alert1: {
      buttonList: [{
        'text': 'submit',
        onClick: () => {
          alert('submit')
        }
      },
      {
        'text': 'cancel',
        onClick: () => {
          alert('cancel')
        }
      },
      {
        'text': 'close',
        onClick: () => {
          alert('close')
        }
      }],
      msg: '定义多个按钮，多行展示',
      title: '弹框标题',
      maxButtonTextLength: 6
    },
    alert2: {
      buttonList: [{
        'text': 'submit',
        color: 'red'
      },
      {
        'text': 'cancel',
        color: 'gray'
      },
      {
        'text': 'close',
        color: '#333'
      }],
      msg: '定义多个按钮，多行展示，颜色自定义',
      title: 'Confirm',
      maxButtonTextLength: 6
    },
    alert3: {
      buttonList: [{
        'text': '确认'
      },
      {
        'text': '取消'
      }],
      msg: '检测到您这次操作比较重要，请确认是否继续执行\n继续？',
      title: '文本换行',
      maxButtonTextLength: 4
    },
    alert4: {
      buttonList: [{
        'text': '没有title',
        'color': '#fa871e'
      },
      {
        'text': '文本居左',
        'color': '#333'
      }],
      msg: '检测到您这次操作比较重要，请确认是否继续执行\n继续？',
      title: '',
      maxButtonTextLength: 8
    },
    alert5: {
      buttonList: [{
        'text': '确认',
        'onClick': () => {
          alert('确认回调')
        }
      },
      {
        'text': '取消',
        'onClick': () => {
          alert('取消回调')
        }
      }],
      msg: '检测到您这次操作比较重要，请确认是否继续执行\n继续？',
      title: '回调demo',
      maxButtonTextLength: 8
    },
    alert6: {},
    alert7: {
      buttonList: [{
        'text': '确定按钮太长自动截取'
      },
      {
        'text': '取消按钮太长自动截取'
      }],
      msg: '按钮太长自动截取，看看有没有截取？',
      title: '按钮太长自动截取',
      maxButtonTextLength: 5
    },
    alert8: {
      msg: '超级长的标题',
      title: '设置一个超级长的标题，看看最后呈现的效果是什么',
      maxButtonTextLength: 5
    },
    alert9: {
      msg: '这是一个超级长的描述，看看最后是否会换行，或者换了多少行，最终效果是啥',
      maxButtonTextLength: 5
    },
    alert10: {
      buttonList: [{
        'text': '一个按钮'
      }]
    },
    alert: {},
    visible: false
    
  }

  handleButtonClick = (param) => {
    this.setState({
      alert: this.state[param],
      visible: true
    })
  }

  render() {
    const { alert, visible } = this.state
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ScrollView>
          <Button 
            title="多个按钮，颜色默认" 
            onPress={() => { this.handleButtonClick('alert1') }}>
          </Button>
          <Button 
            title="多个按钮，自定义按钮颜色" 
            onPress={() => { this.handleButtonClick('alert2') }}>
          </Button>
          <Button 
            title="有title时，描述换行，居中" 
            onPress={() => { this.handleButtonClick('alert3') }}>
          </Button>
          <Button 
            title="没有title，描述居左" 
            onPress={() => { this.handleButtonClick('alert4') }}>
          </Button>
          <Button 
            title="回调测试" 
            onPress={() => { this.handleButtonClick('alert5') }}>
          </Button>
          <Button 
            title="什么都不传" 
            onPress={() => { this.handleButtonClick('alert6') }}>
          </Button>
          <Button 
            title="按钮太长" 
            onPress={() => { this.handleButtonClick('alert7') }}>
          </Button>
          <Button 
            title="标题太长" 
            onPress={() => { this.handleButtonClick('alert8') }}>
          </Button>
          <Button 
            title="描述太长" 
            onPress={() => { this.handleButtonClick('alert9') }}>
          </Button>
          <Button 
            title="一个按钮" 
            onPress={() => { this.handleButtonClick('alert10') }}>
          </Button>
        </ScrollView>
        <YMMAlert 
          message={alert.msg} 
          buttonList={alert.buttonList} 
          title={alert.title}
          visible={visible}
          maxButtonTextLength={alert.maxButtonTextLength}
        ></YMMAlert>
      </View>
    )
  }
}
