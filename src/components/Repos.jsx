import React from 'react';
import GithubRepo from './GithubRepo.jsx';
import getGithubToken from '../APIKeys.js';
import Infinite from 'react-infinite';

// var ulStyle = {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent : "flex-start"
// };

class Repos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            repos: [],
            page: 1,
            loading: false,
            loadEnd: false
        };
        this.fetchRepos = this.fetchRepos.bind(this);
        this.infiniteLoad = this.infiniteLoad.bind(this);
        this.listRepos = this.listRepos.bind(this);
    }
    
    fetchRepos(){
        if(!this.state.loadEnd) {
            var GITHUB_API_TOKEN = getGithubToken();
            this.setState({
                loading: true
            });
            
            fetch(`https://api.github.com/users/${this.props.params.username}/repos?page=${this.state.page}&per_page=50&access_token=${GITHUB_API_TOKEN}`)
            .then(response => response.json())
            .then(repos => {
                //console.log("repos=",repos); //Test
                if(repos.length > 0){
                    
                    var currentRepos = this.state.repos;
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
                         repos: currentRepos.concat(formattedRepos),
                         loading: false,
                         page: this.state.page + 1
                    });
                }
                else {
                    this.setState({
                        loading: false,
                        loadEnd: true
                    });
                }
            });
        }
        else {
            //Prevent isInfiniteLoading from sticking to true
            this.setState({
                loading: false
            });
        }
    }
    
    listRepos(repo){
         return (
             <div key={repo.repoName}>
                <GithubRepo username={repo.username} fullName={repo.fullName} url={repo.url} size={repo.size} />
            </div>
         );
    }
    
    infiniteLoad() {
        return (
            <div>Loading!!!!</div>
        );
    }
    
    render(){
        return (
            <div className="repos-page">
                <h3>{this.props.params.username}'s repos:</h3>
                <Infinite
                    isInfiniteLoading={this.state.loading} 
                    onInfiniteLoad={this.fetchRepos} 
                    elementHeight={22} 
                    infiniteLoadBeginEdgeOffset={100} 
                    useWindowAsScrollContainer={true}
                    loadingSpinnerDelegate={this.infiniteLoad()}
                >
                    {this.state.repos.map(repo => {return this.listRepos(repo)})}
                </Infinite>
            </div>
        );
    }
}

export default Repos;