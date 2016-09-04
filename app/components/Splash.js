import React from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';
import { Parallax, Background } from 'react-parallax';
import ParallaxHover from 'react-parallax-hover';

class Splash extends React.Component {
  render() {
    return (
      <div>   
        <div className="crt-parallaxvideo">
          <video autoPlay loop muted>
              <source src="../../assets/stretching.mp4" type="video/mp4"/>
          </video>
        </div>
        <Parallax strength={400} className="parallax-row"
          bgImage="https://static.pexels.com/photos/17840/pexels-photo.jpg">
          <ParallaxHover width='500' height='200'>
            <img ref="image" className="landing-page-parallax-overlay" alt=" " />
            <h1 ref="text">STRENGTH</h1>
          </ParallaxHover>
        </Parallax>
        <Parallax strength={400} className="parallax-row"
          bgImage="https://aos.iacpublishinglabs.com/question/aq/700px-394px/old-join-la-fitness_4db9384490d8bf5f.jpg?domain=cx.aos.ask.com">
          <ParallaxHover width='500' height='200'>
            <img ref="image" className="landing-page-parallax-overlay" alt=" " />
            <h1 ref="text">CONFIDENCE</h1>
          </ParallaxHover>
        </Parallax> 
        <Parallax strength={400} className="parallax-row"
          bgImage="http://images.askmen.com/1080x540/2016/01/06-040026-how_to_track_your_fitness_progress.jpg">
          <ParallaxHover width='500' height='200'>
            <img ref="image" className="landing-page-parallax-overlay" alt=" " />
            <h1 ref="text">ENDURANCE</h1>
          </ParallaxHover>
        </Parallax>
        <Parallax strength={400} className="parallax-row"
          bgImage="http://www.coast-fitness.com/wp-content/uploads/2013/09/cf-page-headers-group-fitness-classes.png">
          <ParallaxHover width='500' height='200'>
            <img ref="image" className="landing-page-parallax-overlay" alt=" " />
            <h1 ref="text">HEALTH</h1>
          </ParallaxHover>
        </Parallax>
        <Parallax strength={400} className="parallax-row"
            bgImage="https://assets.entrepreneur.com/content/3x2/1300/20160201225029-weights-fitness-workout-work.jpeg">
          <ParallaxHover width='500' height='200'>
            <img ref="image" className="landing-page-parallax-overlay" alt=" " />
            <h1 ref="text">WHAT'S YOUR MOTIVATION?</h1>
          </ParallaxHover>
        </Parallax>
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
