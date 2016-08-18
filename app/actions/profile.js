export function loadProfile(url) {
  return (dispatch) => { 
    return loadUser(url)(dispatch)
    .then((error) => {
      if(error) {
        return console.error('Failed to load profile:', error);
      }
    });
  };
}

export function loadUser(url) {
  return (dispatch) => {
    return fetch('/users/url/' + url, {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_USER_SUCCESS',
            payload: json
          });
        });
      } else {
        dispatch({
          type: 'GET_USER_FAILURE',
          error: response.statusText
        });
        return response.statusText;
      }
    });
  };
}

export function loadGoals(userId) {
  return (dispatch) => {
    return fetch('/users/' + userId + '/goals', {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_GOALS_SUCCESS',
            payload: Array.isArray(json) ? json : [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_GOALS_FAILURE',
            error: json
          });
        });
      }
    });
  };
}