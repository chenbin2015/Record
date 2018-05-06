import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
// @pureRender
export default class Entry extends Component {
  shouldComponentUpdate(nextProps,nextState){
    console.log('nextState:', nextState)
    console.log('this.state:', this.state)
    console.log(this.state == nextState)
    return true
  }
  state = {
    info:{
      name:'张三',
      age:'21'
    },
    count: 1
  }
  handleUpdateChange = () => {
    'use strict'
    let { count } = this.state
   
    console.log(this.state)
   
    this.setState({
       count: count++
    })
    this.setState({
       count: count++
    })
  } 
  render() {
    const { info } = this.state

    return (
      <div>
        About
        <p>
        	<Link to='./'>home</Link>
          <button onClick={this.handleUpdateChange}>测试</button>
          <span>姓名：{info.name}</span>
           <span>年龄：{info.age}</span>
        </p>
      </div>
    )
  }
}
