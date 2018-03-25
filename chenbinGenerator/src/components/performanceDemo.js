import React, { Component, PropTypes } from 'react';
// @pureRender
export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps){
  	const { currentIndex, index } = nextProps
  	console.log('currentIndex == index:', currentIndex == index)
  	return currentIndex == index
  }
  
  render() {
  	const { currentIndex, index } = this.props
    return (
      <div style={{margin:'20px'}}>
        <button onTouchStart={()=>{this.props.onClick(Math.random())}}>change Text</button>
            <div style={{background: currentIndex == index ? 'red': 'green'}}>{this.props.text}</div>
      </div>
    )
  }
}