import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import * as HelloWorldActions from '../actions/HelloWorld'
import HelloWorld from '../components/helloWorld'
// @pureRender
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount () {
    console.log('App')
  }

  render() {
    const { helloChan } = this.props
    return (
      <div>
       <p> {helloChan.config.text}</p>
        <Link to='/c' >联系我们</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/a' >关于我们</Link>
         {this.props.children}
			</div>
    )
  }
}

const mapStateToProps = state => {
  return { helloChan: state.helloChan }
}
const mapDispatchToProps = dispatch => ({
  helloWorldActons: bindActionCreators(HelloWorldActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
