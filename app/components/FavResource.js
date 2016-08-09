import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

var SPACE = '    ';

class FavResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favresource: []
    };
  }

  componentDidMount() {
    this.setState({
      favresource: this.props.favresource
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favresource: nextProps.favresource
    });
  }

  renderFavResource() {
    if(this.state.favresource && Array.isArray(this.state.favresource)) {
      return _.map(this.state.favresource, (resource, index) => {
        return (
          <div key={index}>
            <div>
            {resource.type}:{SPACE}
            <a href={resource.url} target="_blank">{resource.url}</a>
            </div>
          </div>
       );
     });
    } else {
      return undefined;
    }
  }

  render() {
    console.log("state.favresource", this.state.favresource)
    const favresource = this.renderFavResource();
      return (
        <div>
          <h2>Resources:</h2>
          {favresource}
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {           //reducer name index.js / property name in reducer
    favresource: state.favresource.favresource
  };
}

export default connect(mapStateToProps)(FavResource);
