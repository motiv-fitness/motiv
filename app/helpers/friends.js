module.exports.isFriend = function(currID, otherID) {
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
