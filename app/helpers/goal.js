export function getGoals(userId) {
  return fetch('/api/goal/' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return Array.isArray(json) ? json : [json];
      });
    } else {
      return response.json().then((json) => {
        return json;
      });
    }
  });
}

export function goal(goalAdd) {
  return (dispatch) => {
    return fetch('/api/goal', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        goalAdd: goalAdd
      }),
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json()
        .then((json) => {
          dispatch({
            type: 'DISPLAY_GOAL_SUCCESS'
          });
        });
      } else {
        return response.json()
        .then((json) => {
          dispatch({
            type: 'DISPLAY_GOAL_FAIL',
            error: json
          })
        })
      }
    })
  }
}

export function postGoal(goal) {
  return fetch('/api/goal', {
    method: 'post',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      goalAdd: goal
    }),
    credentials: 'same-origin'
  }).then((response) => {
    if (response.ok) {
      return response.json()
      .then((json) => {
        return json;
      });
    } else {
      return response.json()
      .then((json) => {
        return json;
      });
    }
  });
}

// THIS IS WORKING
export function putGoal(goal) {
  return fetch('/api/goal', {
    method:'PUT',
    headers:{'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body:JSON.stringify({goal})
  }).then((response) => {
    return response.json();
  });
}

export function deleteGoal(goalId) {
  return fetch('/api/goal', {
    method:'delete',
    headers:{'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body:JSON.stringify({goalId})
  }).then((response) => {
    return response.json();
  });
}
