import React from 'react';

class AddFriendButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {

    
    return (    
      <button className="btn btn-primary" 
              >Add Friend</button>
    );
  }
}

export default AddFriendButton;