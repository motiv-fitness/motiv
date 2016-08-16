module.exports.isFriend = function(currID, otherID) {
  // return fetch('/api/friends/check?curr=' + currID + '&otherID=' + otherID, {
  return fetch('/api/friends?userID=' + currID, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then((response) => {
    console.log("we responded", response)
    if (response.ok) {
      console.log("returning")
      return response.json();
    } else {
      return response.json().then((json) => {
        console.log("error checking friends", json)

      });
    }
  })

}
