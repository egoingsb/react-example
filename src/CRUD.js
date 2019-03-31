import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Subject from './components/Subject';
import { Navigation} from './components/Navigation';
import Control from './components/Control';
import { ContentRead } from './components/ContentRead';
import { ContentCreate } from './components/ContentCreate';
import { ContentUpdate } from './components/ContentUpdate';
import { ContentWelcome } from './components/ContentWelcome';

class App extends Component {
  topicsMaxId = 3;
  constructor(props){
    super(props);
    this.state = {
      active:null,
      mode:'welcome',
      topics:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for user Interaction'}
      ]
    }
  }
  getActiveContent(){
    var currentContent = null;
    var i = 0; 
    while(i < this.state.topics.length){
      if(this.state.topics[i].id === this.state.active){
        currentContent = this.state.topics[i];
        break;
      }
      i = i + 1;
    }
    return currentContent;
  }
  selectHandler(id){
    this.setState({active:id, mode:'read'});
  }
  render() {   
    var content;
    if(this.state.mode === 'read'){
      var currentContent = null;
      var i = 0; 
      while(i < this.state.topics.length){
        if(this.state.topics[i].id === this.state.active){
          currentContent = this.state.topics[i];
          break;
        }
        i = i + 1;
      }
      content = <ContentRead content={this.getActiveContent()}></ContentRead>
    } else if(this.state.mode === 'create') {
      content = <ContentCreate onSubmit={
        function(formData){
          var insertedId = ++this.topicsMaxId;
          var topics = this.state.topics.concat({
            id:insertedId,
            title:formData.title,
            desc:formData.desc
          })
          this.setState({topics:topics,active:insertedId,mode:'read'});
        }.bind(this)
      }></ContentCreate>
    } else if(this.state.mode === 'update') {
      content = <ContentUpdate 
        onSubmit={
          function(formData){
            var topics = this.state.topics.map(function(el){
              if(el.id === formData.id){
                return Object.assign({}, el, {title:formData.title, desc:formData.desc});
                } else {
                return el;
                }
            });
            this.setState({topics:topics,active:formData.id,mode:'read'});
          }.bind(this)
        }
        content={this.getActiveContent()}
        ></ContentUpdate>
    } else if(this.state.mode === 'welcome'){
      content = <ContentWelcome></ContentWelcome>
    }
    return (
      <div className="app">
        <Subject title="HTML" subTitle="Coding everybody" onClick={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}></Subject>
        <Navigation onSelect={this.selectHandler.bind(this)} items={this.state.topics} active={this.state.active}></Navigation>
        <Control mode={this.state.mode} onChangeMode={function(mode){
          if(mode === 'delete'){
            var topics = this.state.topics.filter(function(el){
              if(el.id !== this.state.active) {
                return el;
              }
            }.bind(this));
            this.setState({mode:'welcome', active:0, topics:topics});
          }
          this.setState({mode:mode});
        }.bind(this)}></Control>
        {content}
      </div>
    );
  }
}

export default App;