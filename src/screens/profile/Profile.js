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
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = {
    paper: {
        position: 'relative',
        width: "180px",
        backgroundColor: "#fff",
        top: "30%",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "20px"
    },
    media: {
        height: '200px',
        paddingTop: '56.25%', // 16:9
    },
    imageModal: {
        position: 'relative',
        backgroundColor: "#fff",
        top: "30%",
        width: "50%",
        margin: "0 auto",
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
            newFullName: '',
            mediaData: null,
            imageModalOpen: false,
            currentItem: null
        }
    }

    componentDidMount() {
        this.getUserInfo();
        this.getMediaData();
    }

    getUserInfo = () => {
        let that = this;
        let url = `${constants.userInfoUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url, {
            method: 'GET',
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
        }).catch((error) => {
            console.log('error user data',error);
        });
    }

    getMediaData = () => {
        let that = this;
        let url = `${constants.userMediaUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url,{
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            that.setState({
                mediaData: jsonResponse.data
            });
        }).catch((error) => {
            console.log('error media data',error);
        });
    }

    handleOpenEditModal = () => {
        this.setState({ editOpen: true });
    }

    handleCloseEditModal = () => {
        this.setState({ editOpen: false });
    }

    handleOpenImageModal = (event) => {
        var result = this.state.mediaData.find(item => {
            return item.id === event.target.id
        })
        console.log(result);
        this.setState({ imageModalOpen: true, currentItem: result });
    }

    handleCloseImageModal = () => {
        this.setState({ imageModalOpen: false });
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
                
                {this.state.mediaData != null &&
                <GridList cellHeight={'auto'} cols={3} style={{padding: "40px"}}>
                {this.state.mediaData.map(item => (
                    <GridListTile key={item.id}>
                    <CardMedia
                        id={item.id}
                        style={styles.media}
                        image={item.images.standard_resolution.url}
                        title={item.caption.text}
                        onClick={this.handleOpenImageModal}
                    />
                    </GridListTile>
                ))}
                </GridList>}
                
                {this.state.currentItem != null &&
                <Modal
                    aria-labelledby="image-modal"
                    aria-describedby="modal to show image details"
                    open={this.state.imageModalOpen}
                    onClose={this.handleCloseImageModal}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                >
                    <div style={styles.imageModal}>
                        <div>
                            <img src={this.state.currentItem.images.standard_resolution.url} alt={this.state.currentItem.caption.text} />
                        </div>
                        <div>
                            <Avatar
                            alt="User Image"
                            src={this.state.profile_picture}
                            style={{width: "50px", height: "50px"}}
                            />
                            {this.state.username} <hr />
                            {this.state.currentItem.caption.text}
                        </div>
                    </div>
                </Modal>}
            </div>
        )
    }
}

export default Profile;