import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as HelloWorldActions from '../actions/HelloWorld'
import HelloWorld from '../components/helloWorld'
// @pureRender
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div>
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
