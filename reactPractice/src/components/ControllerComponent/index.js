import React from 'react';
export default class ControllerComponent extends React.Component {
    state = {
        value: ''
    }
    handleInput = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    render() {
        return (
            <input onInput={this.handleInput} />
        )
    }
};