import React from 'react';
import GithubUser from './GithubUser';
import getGithubToken from '../APIKeys.js';

class Followers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            followers: []
        };
    }
    
    componentDidMount(){
        var GITHUB_API_TOKEN = getGithubToken();
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${GITHUB_API_TOKEN}`)
        .then(response => response.json())
        .then(followers => {
            //console.log("Followers=",followers); //Test
            
            var formattedFollowers = followers.map(follower => {
                return {
                    username: follower.login,
                    avatar_url: follower.avatar_url
                };
            });
            
            this.setState({
                 followers: formattedFollowers
            });
        });
    }
    
    summonFollower(follower){
         return <GithubUser key={follower.username} username={follower.username} avatar_url={follower.avatar_url} />;
    }
    
    render(){
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul>
                    {this.state.followers.map(follower => {return this.summonFollower(follower)})}
                </ul>
            </div>
        );
    }
}

export default Followers;