import React from 'react';
import './App.css';
import HOC from './components/HOC'
import BaseComponent from './components/BaseComponent'
import ControllerComponent from './components/ControllerComponent'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default class APP extends React.Component {
  state = {
    index: 0
  }
  componentDidMount() {
    // this.setState({
    //   index: this.state.index + 1
    // })
    // this.setState({
    //   index: this.state.index + 1
    // })
    // this.setState({
    //   index: this.state.index + 1
    // })
    // setTimeout(() => {
    //   this.setState(function (state) {

    //     return {
    //       index: state.index + 1
    //     }
    //   })
    // }, 0)
    // this.setState({
    //   index: this.state.index + 1
    // })
    // this.setState({
    //   index: this.state.index + 1
    // })
    // setTimeout(() => {
    //   console.log(this.state.index)
    // }, 2000)
  }
  handleClick = () => {
    this.setState({
      index: this.state.index + 12
    })
    this.setState({
      index: this.state.index + 25
    })
    this.setState({
      index: this.state.index + 97
    })
    console.log(this.state.index)
    setTimeout(() => {
      console.log(this.state.index)
    }, 2000)
  }

  render() {
    const HOCOBJ = HOC(BaseComponent)
    return (
      <div><HOCOBJ></HOCOBJ>
        <ControllerComponent ></ControllerComponent>
        <button onClick={this.handleClick}>测试</button>
      </div>
    )
  }
};
