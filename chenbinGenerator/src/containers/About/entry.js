import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
// @pureRender
export default class Entry extends Component {

  render() {
    return (
      <div>
        About
        <p>
        	<Link to='./'>home</Link>
        </p>
      </div>
    )
  }
}
