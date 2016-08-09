import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

var SPACE = '    ';

class FavResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favresources: []
    };
  }

  componentDidMount() {
    this.setState({
      favresources: this.props.favresources
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favresources: nextProps.favresources
    });
  }

  renderFavResource() {
    if(this.state.favresources && Array.isArray(this.state.favresources)) {
      return _.map(this.state.favresources, (resource, index) => {
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
    favresources: state.favresource.data
  };
}

export default connect(mapStateToProps)(FavResource);
