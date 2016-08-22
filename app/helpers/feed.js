module.exports.initiateFeed = function(userId) {
  // return fetch('/api/feed?userId=' + userId, {
  return fetch('/api/feed/' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return Array.isArray(json) ? json : [json]
      });
    } else {
      return response.json().then((json) => {
        return json;
      });
    }
  })
}

module.exports.updateFeed = function(userId) {
  return fetch('/api/feed/next/' + userId, {
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
