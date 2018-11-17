import React, {Component} from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const theme = createMuiTheme({
  palette: {
    primary:{
      main:'#263238'
    },
    secondary: {
      main: '#ffffff',
    }
  }
});

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
  }
})

function Header(props) {
  const {classes, isSearchBarVisible, isProfileIconVisible} = props;
  return (<div>
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary" className="app-header">
        <Toolbar>
          <span className="header-logo">Image Viewer</span>
          <div className={classes.grow}/>
          {isSearchBarVisible &&
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase onChange={(e)=>{props.searchHandler(e.target.value)}} placeholder="Search…" classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}/>
            </div>
          }
          {isProfileIconVisible &&
            <IconButton>
              <Avatar alt="Profile Pic" src={props.userProfileUrl} className={classes.avatar}/>
            </IconButton>
          }
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  </div>)
}

export default withStyles(styles)(Header)
