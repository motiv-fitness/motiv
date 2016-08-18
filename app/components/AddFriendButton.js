import React from 'react';
import * as help from '../helpers/friends.js'
import { connect } from 'react-redux'
import _ from 'lodash';

class AddFriendButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDisabled: false,
      user: this.props.user,
      buttonText: 'Follow'
    };

    this.handleIsFriend = this.handleIsFriend.bind(this)
    this.handleGetAllFriends = this.handleGetAllFriends.bind(this)
    this.handleToggleFriend = _.debounce(this.handleToggleFriend.bind(this), 1000)
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });


    this.handleIsFriend()
      .then((result) => {
        if (result) {
          this.setState({
            isDisabled: result,
            buttonText: 'Following'
          }) 
        } else {

        }
      })
  }

  handleIsFriend() {

    var id1 = this.props.loggedInUser.id,
        id2 = this.state.user.id;

    console.log("checking if these are friends", id1, id2)

    return help.isFriend(id1, id2)
      .then((response) => {
        return response.isFriend;
      });
  }

  handleGetAllFriends() {

    var userID = this.state.user.id;

    //need to do additional stuff to get friend data to display
    help.getAllFriends(userID).then((response) => {
      console.log("returning from getAllFriends", response);
    });
  }

  handleToggleFriend() {

    console.log("inside toggle friends")

    var id1 = this.props.loggedInUser.id,
        id2 = this.state.user.id;

      //is friends, delete
    if (this.state.isDisabled) {
      console.log("we are friends")


      help.deleteFriends(id1, id2).then((response) => {
        this.setState({
          isDisabled: false,
          buttonText: 'Follow'
        })
        console.log("not anymore")

      });  

      //not friends, add
    } else {
      console.log("let's be friends")

      help.addFriends(id1, id2).then((response) => {
        this.setState({
          isDisabled: true,
          buttonText: 'Following'
        })
        console.log("now we're friends")
      });  

    }

    
  }

  render() {
    return (    
      <button className="btn btn-primary" onClick={this.handleToggleFriend}>{this.state.buttonText}</button>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.user
  };
};

export default connect(mapStateToProps)(AddFriendButton);