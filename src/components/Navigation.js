import React, { Component } from 'react';
class NavigationItem extends Component {
  clickHandler(id, event) {
    event.preventDefault();
    this.props.onClick(id);
  }
  render() {
    return (<li>
      <a style={{ textDecoration: this.props.active ? 'underline' : 'none' }} href={this.props.href} onClick={this.clickHandler.bind(this, this.props.id)}>
        {this.props.label}
      </a>
    </li>);
  }
}
export class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  clickHandler(selectId) {
    this.props.onSelect(selectId);
  }
  render() {
    var tags = this.props.items.map(function (elem) {
      return (
        <NavigationItem 
          active={elem.id === this.props.active} 
          key={elem.id} 
          id={elem.id} 
          href={elem.id + '.html'} 
          label={elem.title} 
          onClick={this.clickHandler.bind(this)}></NavigationItem>);
    }.bind(this));
    return (
      <nav>
        <ol>
          {tags}
        </ol>
      </nav>
    );
  }
}
