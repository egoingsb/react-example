import React, { Component } from 'react';

class Subject extends Component{
  render(){
    return (
        <header>
          <h1>{this.props.title}</h1>
          {this.props.sub}
        </header>  
    );
  }
}

class ListLink extends Component{
  render(){
    var style = this.props.active ? {color:'red', backgroundColor:'blue', textDecoration:'none'} : {}
    return(
      <li><a href={this.props.href} style={style} onClick={function(id, ev){
        ev.preventDefault();
        this.props.onClick(id);
        console.log('LinkList', id);
      }.bind(this, this.props.id)}>{this.props.label}</a></li>
    );
  }
}

class TOC extends Component{
  state = {selected:null}
  getList(){
    return this.props.data.map(function(el){
      return (
        <ListLink 
          key={el.id} 
          id={el.id}
          href={el.id+'.html'} 
          label={el.title} 
          onClick={function(id){
            // change state id => id
            console.log('TOC', id);
            this.props.onSelect(id);
          }.bind(this)}
          active={this.props.selected === el.id}>
        </ListLink>
      );
    }.bind(this));
  }
  render(){
    return (
      <nav>
        <ol>
          {this.getList()}
        </ol>
      </nav>
    );
  }
}

class Content extends Component{
  render (){
    return (
      <article>
        <h2>{this.props.data.title}</h2>
        {this.props.data.desc}
      </article>
    );
  }
}

class App extends Component {
  state = {
    subject:{
      title:'WEB',
      sub:'World wide web'
    },
    welcome:{title:'Welcome', desc:'Hello, React.js'},
    selected_contents_id:0,
    contents:[
      {id:1, title:'HTML', desc:'For information.'},
      {id:2, title:'CSS', desc:'For design.'},
      {id:3, title:'JavaScript', desc:'For interaction.'},
    ]
  }
  getContent(){
    if(this.state.selected_contents_id === 0){
      return this.state.welcome;
    }
    return this.state.contents.filter(function(el){
      if(el.id === this.state.selected_contents_id){
        return el;
      }
    }.bind(this))[0];
  }
  render() {
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}></Subject>      
        <TOC onSelect={function(id){
          console.log('APP', id);
          this.setState({selected_contents_id:id});
        }.bind(this)} data={this.state.contents} selected={this.state.selected_contents_id}></TOC>
        <Content data={this.getContent()}></Content>
      </div>
    );
  }
}

export default App;
