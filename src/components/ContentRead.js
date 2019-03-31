import React, { Component } from 'react';
export class ContentRead extends Component {
  render() {
    return (<article>
      <h2>{this.props.data.title}</h2>
      {this.props.data.desc}
    </article>);
  }
}
