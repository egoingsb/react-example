import React, { Component } from 'react';
export class ContentRead extends Component {
  render() {
    return (<article>
      <h2>{this.props.content.title}</h2>
      {this.props.content.desc}
    </article>);
  }
}
