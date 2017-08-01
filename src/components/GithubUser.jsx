import React from 'react';
import {Link} from 'react-router';

class GithubUser extends React.Component {
    constructor(props){
        super(props);
        //console.log(props);
        this.defaultProps = {
            username: props.username,
            avatar_url: props.avatar_url
        };
    }
    
    render(){
        return (
            <Link to={`user/${this.props.username}`}>
                <img alt={this.props.username} src={this.props.avatar_url} />
                {this.props.username}
            </Link>
        );
    }
}

export default GithubUser;