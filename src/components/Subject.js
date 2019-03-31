import React, { Component } from 'react';

export default class Subject extends Component{
    clickHandler(event){
      event.preventDefault();
      this.props.onClick();
    }
    render(){
      return(
        <header>
          <h1><a href="/" onClick={this.clickHandler.bind(this)}>{this.props.title}</a></h1>
          {this.props.subTitle}
        </header>
      );
    }
  }