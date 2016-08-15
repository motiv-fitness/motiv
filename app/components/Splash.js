import React from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';

class Splash extends React.Component {
  render() {
    return (
      <div className="container">     
       <div data-align="center" 
            className="embed-responsive embed-responsive-16by9">
          <video autoPlay loop id="video-background" muted>
            <source src="../../assets/stretching.mp4" type="video/mp4"/>
          </video>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Splash);
