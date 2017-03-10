import React, { Component, PropTypes } from 'react';
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
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    const { helloChan, helloWorldActons } = this.props
    return (
      <div>
      	<HelloWorld onClick={helloWorldActons.changeText} text={this.props.text}></HelloWorld>
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
