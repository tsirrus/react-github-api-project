import React from 'react';
import GithubRepo from './GithubRepo.jsx';
import getGithubToken from '../APIKeys.js';

var ulStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent : "flex-start"
};

class Repos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            repos: []
        };
    }
    
    componentDidMount(){
        var GITHUB_API_TOKEN = getGithubToken();
        fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${GITHUB_API_TOKEN}`)
        .then(response => response.json())
        .then(repos => {
            //console.log("repos=",repos); //Test
            
            var formattedRepos = repos.map(repo => {
                //console.log("Current repo=",repo);
                return {
                    username: this.props.params.username,
                    repoName: repo.name,
                    fullName: repo.full_name,
                    url: repo.html_url,
                    size: repo.size
                };
            });
            
            this.setState({
                 repos: formattedRepos
            });
            //console.log("state Repos=",this.state.repos);
        });
    }
    
    listRepos(repo){
         return <GithubRepo key={repo.repoName} username={repo.username} fullName={repo.fullName} url={repo.url} size={repo.size} />;
    }
    
    render(){
        return (
            <div className="repos-page">
                <h3>{this.props.params.username}'s repos:</h3>
                <ul style={ulStyle}>
                    {this.state.repos.map(repo => {return this.listRepos(repo)})}
                </ul>
            </div>
        );
    }
}

export default Repos;