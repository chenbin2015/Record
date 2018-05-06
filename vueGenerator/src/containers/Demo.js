import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as HelloWorldActions from '../actions/demo'
import HelloWorld from '../components/helloWorld'
// @pureRender
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
  }
  render() {
    const { helloChan, helloWorldActons } = this.props
    return (
      <div>
        <HelloWorld onClick={helloWorldActons.changeText} text={helloChan.text}></HelloWorld>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  helloWorldActons: bindActionCreators(HelloWorldActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(App);