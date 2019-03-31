import React, { Component } from 'react';
export class ContentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    };
  }
  submitHandler(event) {
    event.preventDefault();
    this.props.onSubmit({
      title: this.state.title,
      desc: this.state.desc
    });
  }
  formChangeHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (<article>
      <form onSubmit={this.submitHandler.bind(this)}>
        <p>
          <input type="text" name="title" value={this.state.title} onChange={this.formChangeHandler.bind(this)}></input>
        </p>
        <p>
          <textarea type="text" name="desc" value={this.state.desc} onChange={this.formChangeHandler.bind(this)}></textarea>
        </p>
        <p><input type="submit"></input></p>
      </form>
    </article>);
  }
}
