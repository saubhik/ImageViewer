import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component{
  render(){
    return(
      <Header
        isSearchBarVisible={true}
        isProfileIconVisible={true}/>
    );
  }
}

export default Home;
