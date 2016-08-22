module.exports.isFriend = function(currID, otherID) {
  // return fetch('/api/friends/check?curr=' + currID + '&otherID=' + otherID, {
  return fetch('/api/friends/check?curr=' + currID + '&otherID=' + otherID, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin'
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((json) => {
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
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((json) => {
        console.error("error checking friends", json)

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
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((json) => {
        console.error("error checking friends", json)

      });
    }
  })

}
module.exports.deleteFriends = function(id1, id2) {
  return fetch('/api/friends', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id1: id1,
      id2: id2
    }),
    credentials: 'same-origin'
  })
  .then((response) => {
    if (response.ok) {
      console.error("returning from delete friends")
      return response.json();
    } else {
      return response.json().then((json) => {
        console.error("error deleting friends", json)

      });
    }
  })

}
