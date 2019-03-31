import React, { Component } from 'react';
export class ListLink extends Component {
  render() {
    var style = this.props.active ? { color: 'red', backgroundColor: 'blue', textDecoration: 'none' } : {};
    return (<li><a href={this.props.href} style={style} onClick={function (id, ev) {
      ev.preventDefault();
      this.props.onClick(id);
    }.bind(this, this.props.id)}>{this.props.label}</a></li>);
  }
}
