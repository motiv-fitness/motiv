export function loadProfile(userId) {
  return (dispatch) => { 
    return loadUser(userId)(dispatch)
    .then((error) => {
      if(error) {
        return console.error('Failed to load profile:', error);
      }
      return loadStats(userId)(dispatch)
      .then(() => {
        return loadGoals(userId)(dispatch);
      })
      .then(() => {
        return loadMilestones(userId)(dispatch);
      });
    })
  };
}

export function loadUser(userId) {
  return (dispatch) => {
    console.log("getting user stuff for userID", userId)
    return fetch('/users/' + userId, {
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

export function loadStats(userId) {
  return (dispatch) => {
    return fetch('/users/' + userId + '/stats', {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_STATS_SUCCESS',
            payload: Array.isArray(json) ? json : [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_STATS_FAILURE',
            error: json
          });
        });
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

export function loadMilestones(userId) {
  return (dispatch) => {
    return fetch('/users/' + userId + '/milestones', {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json' 
      },
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_MILESTONES_SUCCESS',
            payload: Array.isArray(json) ? json : [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_MILESTONES_FAILURE',
            error: json
          });
        });
      }
    });
  };
}