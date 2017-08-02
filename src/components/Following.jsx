import React from 'react';
import GithubUser from './GithubUser';
import getGithubToken from '../APIKeys.js';
import Infinite from 'react-infinite';

// var ulStyle = {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent : "flex-start"
// };

class Following extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            following: [],
            page: 1,
            loading: false,
            loadEnd: false
        };
        this.fetchUser = this.fetchUser.bind(this);
    }
    
    fetchUser(){
        if (!this.state.loadEnd) {
            var GITHUB_API_TOKEN = getGithubToken();
            this.setState({
                loading: true
            });
            
            fetch(`https://api.github.com/users/${this.props.params.username}/following?page=${this.state.page}&per_page=50&access_token=${GITHUB_API_TOKEN}`)
            .then(response => response.json())
            .then(following => {
                if (following.length > 0) {

                    var currentFollowing = this.state.following;
                    var formattedFollowing = following.map(user => {
                        return {
                            username: user.login,
                            avatar_url: user.avatar_url
                        };
                    });
                    
                    var totalFollowing = currentFollowing.concat(formattedFollowing);
                    this.setState({
                         following: totalFollowing,
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
            this.setState({
                loading: false
            });
        }
    }
    
    summonFollowing(follow){
         return (
             <div key={follow.username}>
                <GithubUser username={follow.username} avatar_url={follow.avatar_url} />
            </div>
        );
    }
    
    render(){
        return (
            <div className="following-page">
                <h3>{this.props.params.username} is following:</h3>
                <Infinite 
                    isInfiniteLoading={this.state.loading} 
                    onInfiniteLoad={this.fetchUser} 
                    elementHeight={80} 
                    infiniteLoadBeginEdgeOffset={100} 
                    useWindowAsScrollContainer={true}
                >
                    {this.state.following.map(follow => {return this.summonFollowing(follow)})}
                </Infinite>
            </div>
        );
    }
}

export default Following;