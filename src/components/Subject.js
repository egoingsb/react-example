import React, { Component } from 'react';
export class Subject extends Component {
  render() {
    return (<header>
      <h1><a href="/" onClick={function(ev){
        ev.preventDefault();
        this.props.onWelcome();
      }.bind(this)}>{this.props.title}</a></h1>
      {this.props.sub}
    </header>);
  }
}
