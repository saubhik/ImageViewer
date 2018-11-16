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
import AvatarIcon from '../../assets/ic_profile.png';
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
    this.state = {
      "data": [
        {
          "comments": {
            "count": 0
          },
          "caption": {
            "created_time": "1296710352",
            "text": "Inside le truc #foodtruck",
            "from": {
              "username": "kevin",
              "full_name": "Kevin Systrom",
              "type": "user",
              "id": "3"
            },
            "id": "26621408"
          },
          "likes": {
            "count": 15
          },
          "link": "http://instagr.am/p/BWrVZ/",
          "user": {
            "username": "kevin",
            "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_3_75sq_1295574122.jpg",
            "id": "3"
          },
          "created_time": "1296710327",
          "images": {
            "low_resolution": {
              "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_6.jpg",
              "width": 306,
              "height": 306
            },
            "thumbnail": {
              "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_5.jpg",
              "width": 150,
              "height": 150
            },
            "standard_resolution": {
              "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_7.jpg",
              "width": 612,
              "height": 612
            }
          },
          "type": "image",
          "users_in_photo": [],
          "filter": "Earlybird",
          "tags": ["foodtruck"],
          "id": "22721881",
          "location": {
            "latitude": 37.778720183610183,
            "longitude": -122.3962783813477,
            "id": "520640",
            "street_address": "",
            "name": "Le Truc"
          }
        },
        {
          "comments": {
            "count": 0
          },
          "caption": {
            "created_time": "1296710352",
            "text": "Inside le truc #foodtruck",
            "from": {
              "username": "kevin",
              "full_name": "Kevin Systrom",
              "type": "user",
              "id": "3"
            },
            "id": "26621409"
          },
          "likes": {
            "count": 15
          },
          "link": "http://instagr.am/p/BWrVZ/",
          "user": {
            "username": "kevin",
            "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_3_75sq_1295574122.jpg",
            "id": "3"
          },
          "created_time": "1296710327",
          "images": {
            "low_resolution": {
              "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_6.jpg",
              "width": 306,
              "height": 306
            },
            "thumbnail": {
              "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_5.jpg",
              "width": 150,
              "height": 150
            },
            "standard_resolution": {
              "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/6ea7baea55774c5e81e7e3e1f6e791a7_7.jpg",
              "width": 612,
              "height": 612
            }
          },
          "type": "image",
          "users_in_photo": [],
          "filter": "Earlybird",
          "tags": ["foodtruck"],
          "id": "22721882",
          "location": {
            "latitude": 37.778720183610183,
            "longitude": -122.3962783813477,
            "id": "520640",
            "street_address": "",
            "name": "Le Truc"
          }
        }
      ],
      likeSet:new Set(),
      comments:{
        22721881:['lafhlsaf','asfkgisag']
      },
      currrentComment:""
    }
}

  componentDidMount(){
    // let url = ``;
    // return fetch(url,{
    //   method:'GET',
    //   headers: {
    //     'authorization' : this.props.Auth.auth
    //   }
    //
    // }).then((response) =>{
    //   that.setState({isLoading:false});
    //   if (response.status == 401) {
    //     that.logout();
    //   } else {
    //     return response.json();
    //   }
    // }).then((jsonResponse) =>{
    //   if (jsonResponse && jsonResponse.status == "3") {
    //     that.paymentComplete(jsonResponse);
    //   }else {
    //     that.handleError();
    //   }
    // }).catch((error) => {
    //   that.handleError();
    // });
  }

  render(){
    const{classes} = this.props;

    return(
      <div>
        <Header
          isSearchBarVisible={true}
          isProfileIconVisible={true}/>
        <GridList cellHeight={'auto'} spacing={5}>
          {this.state.data.map(item => (
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
            <Avatar alt="Remy Sharp" src={AvatarIcon} className={classes.avatar}/>
          }
          title={item.user.username}
          subheader={time}
        />
        <CardMedia
          className={classes.media}
          image={AvatarIcon}
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
