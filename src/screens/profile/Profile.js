import React, {Component} from 'react';
import './Profile.css';
import {constants} from '../../common/utils'
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';

class Profile extends Component {

    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
        }
        this.state = {
            profile_picture: null,
            username: null,
            full_name: null,
            posts: null,
            follows: null,
            followed_by: null
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {
        let that = this;
        let url = `${constants.userInfoUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url, {
            method:'GET',
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            that.setState({
                profile_picture: jsonResponse.data.profile_picture,
                username: jsonResponse.data.username,
                full_name: jsonResponse.data.full_name,
                posts: jsonResponse.data.counts.media,
                follows: jsonResponse.data.counts.follows,
                followed_by: jsonResponse.data.counts.followed_by
            });
            console.log(jsonResponse.data)
        }).catch((error) => {
            console.log('error user data',error);
        });
    }

    render() {
        return(
            <div>
                <Header />
                <div className="information-section">
                    <Avatar
                        alt="User Image"
                        src={this.state.profile_picture}
                        style={{width: "50px", height: "50px"}}
                    />
                    <span style={{marginLeft: "20px"}}>
                        <div style={{width: "600px"}}> {this.state.username} <br />
                            <div style={{float: "left", width: "200px", fontSize: "small"}}> Posts: {this.state.posts} </div>
                            <div style={{float: "left", width: "200px", fontSize: "small"}}> Follows: {this.state.follows} </div>
                            <div style={{float: "left", width: "200px", fontSize: "small"}}> Followed By: {this.state.followed_by}</div> <br />
                        </div>
                        {this.state.full_name}
                    </span>
                </div>
            </div>
        )
    }
}

export default Profile;