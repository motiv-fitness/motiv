export function displayGoal(userId) {
  return (dispatch) => {
    return fetch('/api/goal/progress', {  // api/goals??
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_GOAL_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_GOAL_FAIL',
              error: json
            })
          });
        }
      })
    }
  }
