import React from 'react';
import _ from 'lodash';

export default class InfiniteLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: -1,
      isUpdating: false,
      isEnd: false
    };
  }

  onFinish(result) {
    this.setState({
      page: result.next,
      isUpdating: false,
      isEnd: result.page === result.next
    });
  }

  setupOnScroll() {
    global.window.onscroll = () => {
      if(!this.state.isEnd &&
         !this.state.isUpdating && 
         this.isUpdate(document.getElementById('loadMoreDiv'))) {
        this.setState({
          isUpdating: true
        });
        this.props.update(false, this.state.page, this.onFinish.bind(this));
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if(this.props.reset && this.state.isEnd || this.state.page === -1) {
      this.setState({
        page: 0,
        isEnd: false
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.reset && this.state.page !== -1) {
      this.props.update(false, this.state.page, this.onFinish.bind(this));
    }
  }

  componentDidMount() {
    this.setupOnScroll();
  }

  componentWillUnmount() {
    global.window.onscroll = null;
  }

  isUpdate(el) {
    return el.getBoundingClientRect().top < global.window.innerHeight * 2.5;
  }

  render() {
    const loader = this.state.isEnd || (!this.state.isEnd && this.props.children.length < 6)
      ? (
          <div id="loadMoreDiv">
            <span className="label label-danger">End</span>
          </div>
        )
      : (
          <div id="loadMoreDiv">
            <img src="./assets/loading-more.gif" />
          </div>
        );

    return (
      <div className='infinite-container'>
        {this.props.children}
        {loader}
      </div>
    );
  }
}