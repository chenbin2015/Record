import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as HelloWorldActions from '../../actions/demo'
import PerformanceDemo from '../../components/performanceDemo'
import Helloworld from '../../components/helloWorld'

// @pureRender
class Entry extends Component {
  state = {
    currentIndex: 0
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('nextProps:', nextProps)
    console.log('this.props:', this.props)
    return true
  }
  componentDidMount(){
    console.log('bbbbbbbb:', this.context)
  }
  handleClick = (index) => {
      const { text, helloWorldActons } = this.props
      this.setState({
        currentIndex: index
      }, () => {
        console.log(333)
        helloWorldActons.changeText(Math.random(), index)
      })
  }
  handleDispatchTest = () => {
    this.state.currentIndex = 2
    console.log(this.state.currentIndex)
  }
  renderList(handle, text) {
    var lists=[]
    for(let i = 0; i <10; i++){
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
        <button onClick={this.handleDispatchTest} >测试</button>
        { this.renderList(helloWorldActons.changeText, text) }
        <Helloworld text={'fsdfsdf'} />

      </div>
    )
  }
}
const mapStateToProps = state => state.store.helloChan
const mapDispatchToProps = dispatch => ({
  helloWorldActons: bindActionCreators(HelloWorldActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Entry);