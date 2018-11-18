import React, {Component} from 'react';
import './Profile.css';
import {constants} from '../../common/utils'
import Header from '../../common/header/Header';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    paper: {
        position: 'relative',
        width: "180px",
        backgroundColor: "#fff",
        top: "30%",
        left: "40%",
        boxShadow: "2px 2px #888888",
        padding: "20px"
    }
};

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
            followed_by: null,
            editOpen: false,
            fullNameRequired: 'dispNone',
            newFullName: ''
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

    handleOpenEditModal = () => {
        this.setState({ editOpen: true });
    }

    handleCloseEditModal = () => {
        this.setState({ editOpen: false });
    }

    inputFullNameChangeHandler = (e) => {
        this.setState({ 
            newFullName: e.target.value 
        })
    }

    updateClickHandler = () => {
        if (this.state.newFullName === '') {
            this.setState({ fullNameRequired: 'dispBlock'}) 
        } else {
            this.setState({ fullNameRequired: 'dispNone' })
        }

        if (this.state.newFullName === "") { return }

        this.setState({
            full_name: this.state.newFullName
        })

        this.handleCloseEditModal()
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
                        <div style={{width: "600px", fontSize: "small"}}> {this.state.username} <br />
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Posts: {this.state.posts} </div>
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Follows: {this.state.follows} </div>
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Followed By: {this.state.followed_by}</div> <br />
                        </div>
                        <div style={{fontSize: "small"}}> {this.state.full_name}
                        <Button variant="fab" color="secondary" aria-label="Edit" style={{marginLeft: "20px"}} onClick={this.handleOpenEditModal}>
                            <Icon>edit_icon</Icon>
                        </Button>
                        </div>
                        <Modal
                            aria-labelledby="edit-modal"
                            aria-describedby="modal to edit user full name"
                            open={this.state.editOpen}
                            onClose={this.handleCloseEditModal}
                            style={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <div style={styles.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Edit
                                </Typography><br />
                                <FormControl required>
                                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                    <Input id="fullname" onChange={this.inputFullNameChangeHandler} />
                                    <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br /><br />
                                <Button variant="contained" color="primary" onClick={this.updateClickHandler}>
                                    UPDATE
                                </Button>
                            </div>
                        </Modal>
                    </span>
                </div>
            </div>
        )
    }
}

export default Profile;