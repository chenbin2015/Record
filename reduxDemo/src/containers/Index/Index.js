import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as HelloWorldActions from '../../actions/HelloWorld'
import HelloWorld from '../../components/helloWorld'

import styles from './main.scss'
// @pureRender
class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { helloChan, helloWorldActons } = this.props
    return (
      <div>
      	<HelloWorld onClick={helloWorldActons.changeText} text={helloChan.config.text}></HelloWorld>
        <div className={styles.test}>Welcome</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Index);
