import React from 'react';
import * as help from '../helpers/friends.js'

class AddFriendButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };

    this.handleIsFriend = this.handleIsFriend.bind(this)
    this.handlegetAllFriends = this.handlegetAllFriends.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
  }

  componentDidMount() {
  }

  handleIsFriend() {

    var id1 = 1,
        id2 = 2;

    help.isFriend(id1, id2)
    .then((response) => {
      console.log("returning from isFriend", response);

      if (!response.message) {
        console.log("this was a success")
      } else {
        console.log("this was a failure")
      }
    });
  }

  handlegetAllFriends() {

    //need to do additional stuff to get friend data to display
    help.getAllFriends(1).then((response) => {
      console.log("returning from isFriend", response);
    });
  }

  handleAddFriend() {
    help.addFriends(1,3).then((response) => {
      console.log("returning from addFriends", response);
    });


  }

  render() {


    return (    
      <button className="btn btn-primary" onClick={this.handleIsFriend}>Add Friend</button>
    );
  }
}

export default AddFriendButton;