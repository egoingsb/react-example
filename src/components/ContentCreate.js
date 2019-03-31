import React, { Component } from 'react';
export class ContentCreate extends Component {
  state = {
    title:'',
    description:''
  }
  formChangeHandler(event){
    this.setState({[event.target.name]:event.target.value});
  }
  submitHandler(event){
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (<article>
      <form onSubmit={this.submitHandler.bind(this)}>
        <p>
          <input type="text" name="title" placeholder="title" onChange={this.formChangeHandler.bind(this)} value={this.state.title}></input>
        </p>
        <p>
          <textarea name="desc" placeholder="description" onChange={this.formChangeHandler.bind(this)} ></textarea>
        </p>
        <p>
          <input type="submit"></input>
        </p>
      </form>
    </article>);
  }
}
