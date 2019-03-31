import React, {component} from React;
class ContentDelete extends component{
    render(){
        return(
            <form>
                <input type="hidden" name={this.state.content.id}></input>
                <input type="submit"></input>
            </form>
        )
    }
}