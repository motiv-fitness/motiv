module.exports.isFriend = function(currID, otherID) {
  // return fetch('/api/friends/check?curr=' + currID + '&otherID=' + otherID, {
  return fetch('/api/friends/check?curr=' + currID + '&otherID=' + otherID, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin'
  })
  .then((response) => {
    // console.log("we responded from isfriend", response)
    if (response.ok) {
      // console.log("returning", response)
      return response.json();
    } else {
      return response.json().then((json) => {
        // console.log("they aren't friends!", json)

      });
    }
  })

}

module.exports.getAllFriends = function(userID) {
  return fetch('/api/friends?userID=' + userID, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin'
  })
  .then((response) => {
    // console.log("we responded from getall friends", response)
    if (response.ok) {
      // console.log("returning")
      return response.json();
    } else {
      return response.json().then((json) => {
        console.log("error checking friends", json)

      });
    }
  })

}

module.exports.addFriends = function(id1, id2) {
  return fetch('/api/friends', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id1: id1,
      id2: id2
    }),
    credentials: 'same-origin'
  })
  .then((response) => {
    // console.log("we responded from addfriends", response)
    if (response.ok) {
      // console.log("returning")
      return response.json();
    } else {
      return response.json().then((json) => {
        console.log("error checking friends", json)

      });
    }
  })

}
