import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as HelloWorldActions from '../../actions/demo'
import PerformanceDemo from '../../components/performanceDemo'
// @pureRender
class Entry extends Component {
  state = {
    currentIndex: 0
  }
  handleClick = (index) => {
      const { text, helloWorldActons } = this.props
      this.setState({
        currentIndex: index
      }, () => {
        helloWorldActons.changeText(Math.random(), index)
      })
  }
   renderList(handle, text) {
    var lists=[]
    for(let i = 0; i <1000; i++){
        lists.push( <PerformanceDemo onClick={() => {this.handleClick(i)} } text={text} key={i} currentIndex={this.state.currentIndex} index={i}  />)
    }
    return lists
  }
  render() {
    const { text, helloWorldActons } = this.props
    return (
      <div>
        Home
        <p>
        	<Link to='./about'>about</Link>
        </p>
        { this.renderList(helloWorldActons.changeText, text) }
      </div>
    )
  }
}
const mapStateToProps = state => state.store.helloChan
const mapDispatchToProps = dispatch => ({
  helloWorldActons: bindActionCreators(HelloWorldActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Entry);