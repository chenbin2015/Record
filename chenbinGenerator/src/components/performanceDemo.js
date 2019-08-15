import React, { Component, PropTypes } from 'react';
// @pureRender
export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps){
  	const { currentIndex, index } = nextProps
  	return currentIndex == index
    //return true
  }

  render() {
    //console.log('@@@@@@@@@@render@@@@@@@@@@@@@@@')
  	const { currentIndex, index } = this.props
    return (
      <div style={{margin:'20px'}}>
        <button onClick={()=>{this.props.onClick(Math.random())}}>change Text</button>
            <div style={{background: currentIndex == index ? 'red': 'green'}}>{this.props.text}</div>
      </div>
    )
  }
}