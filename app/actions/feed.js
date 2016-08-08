export function initiateFeed(userId) {
  return (dispatch) => {
    return fetch('/api/feed?userId=' + userId, {
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
}

export function updateFeed(userId) {
  return (dispatch) => {
    return fetch('/api/feed?userId=' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'UPDATE_FEED',
            payload: Array.isArray(json) ? json : [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'UPDATE_FEED_FAIL',
            error: json
          })
        });
      }
    })
  }

}