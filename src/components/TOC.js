import React, { Component } from 'react';
import { ListLink } from './ListLink';
export class TOC extends Component {
  state = { selected: null };
  getList() {
    return this.props.data.map(function (el) {
      return (<ListLink key={el.id} id={el.id} href={el.id + '.html'} label={el.title} onClick={function (id) {
        this.props.onSelect(id);
      }.bind(this)} active={this.props.selected === el.id}>
      </ListLink>);
    }.bind(this));
  }
  render() {
    return (<nav>
      <ol>
        {this.getList()}
      </ol>
    </nav>);
  }
}
