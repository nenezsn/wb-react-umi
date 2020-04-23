import React, { Component } from 'react';

class _layout extends Component {
  render() {
    return (
      <div>
        <h1>我是file下的layout</h1>
    <div>{this.props.children}</div>
      </div>
    );
  }
}

export default _layout;
