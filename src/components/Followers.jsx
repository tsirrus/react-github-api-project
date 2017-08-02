import React from 'react';
import GithubUser from './GithubUser';
import getGithubToken from '../APIKeys.js';
import Infinite from 'react-infinite';

var ulStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent : "flex-start"
};

class Followers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            followers: [],
            page: 1,
            loading: false
        };
        this.fetchUser = this.fetchUser.bind(this);
    }
    
    fetchUser(){
        var GITHUB_API_TOKEN = getGithubToken();
        this.setState({
            loading: true
        });
                
        fetch(`https://api.github.com/users/${this.props.params.username}/followers?page=${this.state.page}&per_page=25&access_token=${GITHUB_API_TOKEN}`)
        .then(response => response.json())
        .then(followers => {
            console.log("Followers=",followers); //Test
            
            if (followers.length > 0) {
                var currentFollowers = this.state.followers;
                var formattedFollowers = followers.map(follower => {
                    return {
                        username: follower.login,
                        avatar_url: follower.avatar_url
                    };
                });
                
                var totalFollowers = currentFollowers.concat(formattedFollowers);
                this.setState({
                     followers: totalFollowers,
                     loading: false,
                     page: this.state.page + 1
                });
            }
            else {
                this.setState({
                    loading: false
                });
            }
            console.log("currentState=",this.state);
        });
    }
    
    componentDidMount(){

        //this.fetchUser();
    }
    
    summonFollower(follower){
         return <GithubUser key={follower.username} username={follower.username} avatar_url={follower.avatar_url} />;
    }
    
    render(){
        return (
            <Infinite 
                className="followers-page"
                isInfiniteLoading={this.state.loading}
                onInfiniteLoad={this.fetchUser}
                elementHeight={79}
                infiniteLoadBeginEdgeOffset={100}
                useWindowAsScrollContainer={true} >
                <h3>Followers of {this.props.params.username}</h3>
                <ul style={ulStyle}>
                    {this.state.followers.map(follower => {return this.summonFollower(follower)})}
                </ul>
            </Infinite>
        );
    }
}

export default Followers;