import React, {Component, Fragment} from 'react';
export default class Control extends Component{
    render(){
        var read = null;
        if(this.props.mode === 'read'){
            read = (
                <Fragment>
                    <a href="/update" onClick={
                        function(event){
                            event.preventDefault();
                            this.props.onChangeMode('update');
                        }.bind(this)
                    }>update</a>
                    <a href="/delete" onClick={
                        function(event){
                            event.preventDefault();
                            if(window.confirm('really?')){
                                this.props.onChangeMode('delete');
                            }
                        }.bind(this)
                    }>delete</a>
                </Fragment>
            );
        }
        return(
            <div className="control">
                <a href="/create" onClick={function(event){
                    event.preventDefault();
                    this.props.onChangeMode('create');
                }.bind(this)}>create</a>
                {read}
            </div>        
        )
    }
}