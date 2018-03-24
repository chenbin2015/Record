import React, { Component, PropTypes } from 'react';
// @pureRender
export default class HelloWorld extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  componentWillReceiveProps(newProps){
    console.log(newProps)
  }
  render() {
    return (
      <div>
        <button onClick={()=>{this.props.onClick(Math.random())}}>change Text</button>
            <div>{this.props.text}</div>
      </div>
    )
  }
}