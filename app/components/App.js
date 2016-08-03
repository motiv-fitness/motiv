import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProgressBar from '../containers/goals';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <ProgressBar/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default App;
