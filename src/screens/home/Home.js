import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {constants} from '../../common/utils'

const styles =  theme => ({
  card: {
    maxWidth: 500,
  },
  avatar: {
    margin: 10,
  },
  media: {
    height: 0,
    margin:'10px',
    paddingTop: '56.25%', // 16:9
  },
  formControl: {
    width:'100%'
  },
  comment:{
    display:'flex',
    alignItems:'center'
  }
});

class Home extends Component{

  constructor() {
    super();
    sessionStorage.setItem('username','admin');
    sessionStorage.setItem('access-token', '8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65');
    this.state = {
      "data": [],
      filteredData:[],
      userData:{},
      likeSet:new Set(),
      comments:{},
      currrentComment:""
    }
}

  componentDidMount(){
    this.getUserInfo();
    this.getMediaData();
  }

  render(){
    const{classes} = this.props;
    return(
      <div>
        <Header
          userProfileUrl={this.state.userData.profile_picture}
          isSearchBarVisible={true}
          isProfileIconVisible={true}
          searchHandler={this.onSearchEntered}/>
        <GridList cellHeight={'auto'} spacing={5}>
          {this.state.filteredData.map(item => (
            <GridListTile key={item.id}>
              <HomeItem
                classes={classes}
                item={item}
                onLikedClicked={this.likeClickHandler}
                onAddCommentClicked={this.addCommentClickHandler}
                commentChangeHandler={this.commentChangeHandler}
                likeSet={this.state.likeSet}
                comments={this.state.comments}
                commentValue={this.state.currentComment}/>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

  onSearchEntered = (value) =>{
    console.log('search value', value);
    let filteredData = this.state.data;
    filteredData = filteredData.filter((data) =>{
      let string = data.caption.text.toLowerCase();
      let subString = value.toLowerCase();
      return string.includes(subString);
    })
    this.setState({
      filteredData
    })
  }

  likeClickHandler = (id) =>{
    console.log('like id',id);
    var foundItem = this.state.data.find((item) => {
      return item.id === id;
    })

    console.log('found item',foundItem);
    if (foundItem !== undefined) {
      if (!this.state.likeSet.has(id)) {
        foundItem.likes.count++;
        this.setState(({likeSet}) => ({
          likeSet:new Set(likeSet.add(id))
        }))
      }else {
        foundItem.likes.count--;
        this.setState(({likeSet}) =>{
          const newLike = new Set(likeSet);
          newLike.delete(id);

          return {
            likeSet:newLike
          };
        });
      }
    }
    console.log('state',this.state.data);
  }

  addCommentClickHandler = (id)=>{
    console.log('coment id',id,this.state.currentComment, this.state.comments);
    if (this.state.currentComment === "" || this.state.currentComment === undefined) {
      return;
    }

    let commentList = this.state.comments.hasOwnProperty(id)?
      this.state.comments[id].concat(this.state.currentComment): [].concat(this.state.currentComment);

    console.log('comment list', commentList);
    this.setState({
      comments:{
        ...this.state.comments,
        [id]:commentList
      },
      currentComment:''
    })
  }


  commentChangeHandler = (e) => {
    this.setState({
      currentComment:e.target.value
    });
  }

  getUserInfo = () => {
    let that = this;
    let url = `${constants.userInfoUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
    return fetch(url,{
      method:'GET',
    }).then((response) =>{
        return response.json();
    }).then((jsonResponse) =>{
      that.setState({
        userData:jsonResponse.data
      });
    }).catch((error) => {
      console.log('error user data',error);
    });
  }

  getMediaData = () => {
    let that = this;
    let url = `${constants.userMediaUrl}/?access_token=${sessionStorage.getItem('access-token')}`;
    return fetch(url,{
      method:'GET',
    }).then((response) =>{
        return response.json();
    }).then((jsonResponse) =>{
      that.setState({
        data:jsonResponse.data,
        filteredData:jsonResponse.data
      });
    }).catch((error) => {
      console.log('error user data',error);
    });
  }
}

function HomeItem(props) {
  const {classes, item, likeSet, comments} = props;
  let createdTime = new Date(0);
  createdTime.setUTCSeconds(item.created_time);
  let yyyy = createdTime.getFullYear();
  let mm = createdTime.getMonth() + 1;
  let dd = createdTime.getDate();

  let HH = createdTime.getHours();
  let MM = createdTime.getMinutes();
  let ss = createdTime.getSeconds();

  let time = dd+"/"+mm+"/"+yyyy+" "+HH+":"+MM+":"+ss;
  let hashTags = item.tags.map(hash =>{
    return "#"+hash;
  });
  return(
    <div className="home-item-main-container">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="User Profile Pic" src={item.user.profile_picture} className={classes.avatar}/>
          }
          title={item.user.username}
          subheader={time}
        />
        <CardMedia
          className={classes.media}
          image={item.images.standard_resolution.url}
          title={item.caption.text}
        />
        <CardContent>
          <Typography component="p">
            {item.caption.text}
          </Typography>
          <Typography style={{color:'#4dabf5'}} component="p" >
            {hashTags.join(' ')}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={props.onLikedClicked.bind(this,item.id)}>
            {likeSet.has(item.id) && <FavoriteIconFill style={{color:'#F44336'}}/>}
            {!likeSet.has(item.id) && <FavoriteIconBorder/>}
          </IconButton>
          <Typography component="p">
            {item.likes.count} Likes
          </Typography>
        </CardActions>
        <CardContent>
          {comments.hasOwnProperty(item.id) && comments[item.id].map((comment)=>{
            return(
              <div className="row">
                <Typography component="p" style={{fontWeight:'bold'}}>
                  {sessionStorage.getItem('username')}:
                </Typography>
                <Typography component="p" >
                  {comment}
                </Typography>
              </div>
            )
          })}
        </CardContent>
        <CardActions className={classes.comment}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="comment">Add Comment</InputLabel>
            <Input id="comment" value={props.commentValue} onChange={props.commentChangeHandler}/>
          </FormControl>
          <FormControl>
            <Button onClick={props.onAddCommentClicked.bind(this,item.id)}
               variant="contained" color="primary">
              ADD
            </Button>
          </FormControl>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(Home);
