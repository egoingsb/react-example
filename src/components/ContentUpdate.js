import React, { Component } from 'react';
export class ContentUpdate extends Component {
  state = {
    title:this.props.data.title,
    desc:this.props.data.desc
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
          <textarea name="desc" placeholder="description" onChange={this.formChangeHandler.bind(this)} value={this.state.desc} ></textarea>
        </p>
        <p>
          <input type="submit"></input>
        </p>
      </form>
    </article>);
  }
}
