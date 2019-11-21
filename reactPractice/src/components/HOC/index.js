import React from 'react';
export default function HOC(WrappedComponent) {
    return class Helloword extends React.Component {
        render() {
            return (
                <div>
                    <label>我是高阶组件</label><WrappedComponent></WrappedComponent>
                </div>
            )
        }
    };
}
