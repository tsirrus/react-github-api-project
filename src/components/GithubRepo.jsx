import React from 'react';

class GithubRepo extends React.Component {
    constructor(props){
    super(props);
    //console.log(props);
    this.defaultProps = {
        username: props.username,
        repoName: props.repoName,
        fullName: props.fullName,
        url: props.url,
        size: props.size
    };
    
    }
    render(){
        //console.log("Current Repo prop=",this.props);
        return (
            <div>
                <a href={this.props.url} target="_blank">{this.props.fullName}</a>
                <label>{this.props.size}{String.fromCharCode(9733)}</label>
            </div>
        );
    }
}

export default GithubRepo;