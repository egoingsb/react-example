import React, { Component } from 'react';
import { Subject } from './components/Subject';
import { TOC } from './components/TOC';
import { ContentRead } from './components/ContentRead';
import { ContentCreate } from './components/ContentCreate';
import { ContentUpdate } from './components/ContentUpdate';

class App extends Component {
  contents_max_id = 3;
  state = {
    mode:'update',
    subject:{
      title:'WEB',
      sub:'World wide web'
    },
    welcome:{title:'Welcome', desc:'Hello, React.js'},
    selected_contents_id:1,
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
    var content;
    if(this.state.mode === 'read'){
      content = <ContentRead data={this.getContent()}></ContentRead>
    } else if(this.state.mode === 'welcome'){
      content = <ContentRead data={this.state.welcome}></ContentRead>
    } else if(this.state.mode === 'create'){
      content = <ContentCreate onSubmit={
        function(formData){
          var contents_max_id = ++this.contents_max_id;
          var contents = Object.assign([], this.state.contents);
          contents.push({
            id:contents_max_id,
            title:formData.title,
            desc:formData.desc
          });
          this.setState({
            contents:contents,
            selected_contents_id:contents_max_id,
            mode:'read'
          });
        }.bind(this)
      }></ContentCreate>
    } else if(this.state.mode === 'update'){
      content = <ContentUpdate
        data={this.getContent()}
        onSubmit={
          function(formData){
            var newContents = this.state.contents.map(function(el){
              if(el.id === this.state.selected_contents_id){
                return Object.assign({}, el, {title:formData.title,desc:formData.desc});
              } else{
                return el;
              }
            }.bind(this))
            this.setState({
              contents:newContents,
              mode:'read'
            });
        }.bind(this)
      }></ContentUpdate>
    }
    return (
      <div className="App">
        <Subject title={this.state.subject.title} sub={this.state.subject.sub}
          onWelcome={function(){
            this.setState({mode:'welcome', selected_contents_id:0})
          }.bind(this)}
          ></Subject>

        <TOC onSelect={function(id){
          this.setState({selected_contents_id:id, mode:'read'});
        }.bind(this)} data={this.state.contents} selected={this.state.selected_contents_id}></TOC>

        <CRUD onChange={function(mode){
          if(mode === 'delete'){
            this.state.contents.filter(function(el){
              if(this.state.selected_contents_id !== el.id){
                return el;
              }
            }.bind(this));
            this.setState({mode:'welcome',selected_contents_id:0})
          } else {
            this.setState({mode:mode});
          }
        }.bind(this)}></CRUD>

        {content}
      </div>
    );
  }
}
class CRUD extends Component{
  clickHandler(mode, ev){
    ev.preventDefault();
    this.props.onChange(mode);
  }
  render(){
    return (
      <div>
        <a href="/create" onClick={this.clickHandler.bind(this,'create')}>create</a> | 
        <a href="/update" onClick={this.clickHandler.bind(this,'update')}>update</a> | 
        <input type="button" value="delete" onClick={this.clickHandler.bind(this,'delete')} />
      </div>
    );
  }
}

export default App;
