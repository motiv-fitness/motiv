import React from 'react';
import {isFriend} from '../helpers/friends.js'

class AddFriendButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };

    this.handleIsFriend = this.handleIsFriend.bind(this)
  }

  componentDidMount() {
  }

  handleIsFriend() {
    isFriend(1,2).then((response) => {
      console.log("returning from isFriend", response);
    });
  }

  render() {


    return (    
      <button className="btn btn-primary" onClick={this.handleIsFriend}>Add Friend</button>
    );
  }
}

export default AddFriendButton;