import React from 'react';
import GithubUser from './GithubUser';
import getGithubToken from '../APIKeys.js';

var ulStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent : "flex-start"
};

class Following extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            followers: []
        };
    }
    
    componentDidMount(){
        var GITHUB_API_TOKEN = getGithubToken();
        fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${GITHUB_API_TOKEN}`)
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
    
    summonFollowing(follow){
         return <GithubUser key={follow.username} username={follow.username} avatar_url={follow.avatar_url} />;
    }
    
    render(){
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.params.username}</h3>
                <ul style={ulStyle}>
                    {this.state.followers.map(follow => {return this.summonFollowing(follow)})}
                </ul>
            </div>
        );
    }
}

export default Following;