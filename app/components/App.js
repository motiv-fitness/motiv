import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

class App extends React.Component {
  render() {
    return (
      <div id="topContainer">
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;
