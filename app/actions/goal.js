export function displayGoal(userId) {
  return (dispatch) => {
    return fetch('/api/goal', {  // api/goals??
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

export function goal(goal) {
  console.log("inside goalActionCreator", goal)
  return (dispatch) => {
    return fetch('/api/goal', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        goal: goal
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

// THIS IS WORKING
  export function putGoal(benchGoal) {
    //console.log("inside putGoal", benchGoal)
    return (dispatch) => {
      return fetch('/api/goal', {
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body:JSON.stringify({benchGoal})
      }).then((response) => {
        if(response.ok){
          // console.log("--------putGoal is success")
        }
      });
    };
  }

// DELETE WORKS
  export function deleteGoal(benchGoal) {
    return (dispatch) => {
      return fetch('/api/goal', {
        method:'delete',
        headers:{'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body:JSON.stringify({benchGoal})
      }).then((response) => {
        if(response.ok){
          //console.log("deleteGoal is success")
        }
      });
    };
  }


export function getGoal (userId) {
  return (dispatch) => {
    return fetch('/api/goal', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          // console.log("========line 44 inside goalActionCreator", response)
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
