import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProgressBar from './ProgressBar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//needed for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header/>
          <ProgressBar/>
          {this.props.children}
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
