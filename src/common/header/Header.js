import React, {Component} from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: '#c0c0c0',
    marginLeft: 0,
    width: '300px',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#000000'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  avatar: {
    width: 50,
    height: 50,
  },
  appHeader:{
    backgroundColor:'#263238'
  },
  hr:{
    height:'1.5px',
    backgroundColor:'#f2f2f2',
    marginLeft:'5px',
    marginRight:'5px'
  }
})

class Header extends Component{

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  render(){
    const {classes, isSearchBarVisible, isProfileIconVisible} = this.props;
    return (<div>
        <AppBar className={classes.appHeader}>
          <Toolbar>
            <span className="header-logo">Image Viewer</span>
            <div className={classes.grow}/>
            {isSearchBarVisible &&
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon/>
                </div>
                <InputBase onChange={(e)=>{this.props.searchHandler(e.target.value)}} placeholder="Search…" classes={{
                    input: classes.inputInput
                  }}/>
              </div>
            }
            {isProfileIconVisible &&
              <div>
                <IconButton onClick={this.handleClick}>
                  <Avatar alt="Profile Pic" src={this.props.userProfileUrl} className={classes.avatar}/>
                </IconButton>
                <Popover
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}>
                    <div style={{padding:'5px'}}>
                      <MenuItem onClick={this.handleAccount}>My Account</MenuItem>
                      <div className={classes.hr}/>
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                    </div>
                </Popover>
              </div>
            }
          </Toolbar>
        </AppBar>
    </div>)
  }

  handleClick = (event) =>{
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleAccount = ()=>{
    this.props.handleAccount();
    this.handleClose();
  }

  handleLogout = ()=>{
    this.props.handleLogout();
    this.handleClose();
  }

  handleClose = () =>{
    this.setState({ anchorEl: null });
  }
}

export default withStyles(styles)(Header)
