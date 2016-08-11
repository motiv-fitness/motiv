export function goal(benchGoal) {
  console.log("inside goalActionCreator", benchGoal)
  return (dispatch) => {
    return fetch('/api/goal', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        benchGoal: benchGoal
      }),
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
        return response.json()
        .then((json) => {
          dispatch({
            type: 'DISPLAY_GOAL_SUCCESS',
            token: json.token,
            user: json.user
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


export function getData (userId) {
  return (dispatch) => {
    return fetch('/api/goal', {
      method: 'get',
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
