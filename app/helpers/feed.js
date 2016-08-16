module.exports.initiateFeed = function() {
  // return fetch('/api/feed?userId=' + userId, {
  return fetch('/api/feed', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        dispatch({
          type: 'DISPLAY_FEED',
          payload: Array.isArray(json) ? json : [json]
        });
      });
    } else {
      return response.json().then((json) => {
        dispatch({
          type: 'DISPLAY_FEED_FAIL',
          error: json
        })
      });
    }
  })
}

module.exports.updateFeed = function() {
  return fetch('/api/feed/moar', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then((response) => {
    console.log("we responded", response)
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((json) => {
        this.setState({
          isInfiniteLoading: false
        })
        console.log("error infinite loading,", json)

      });
    }
  })

}
