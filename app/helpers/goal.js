export function displayGoal(userId) {
  return (dispatch) => {
    return fetch('/api/goal', {
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

export function goal(goalAdd) {
  console.log("---------posting goalAdd", goalAdd)
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

// THIS IS WORKING
  export function putGoal(goalUpdate) {
    return (dispatch) => {
      return fetch('/api/goal', {
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body:JSON.stringify({goalUpdate})
      }).then((response) => {
        if(response.ok){
        }
      });
    };
  }

  export function deleteGoal(goalDelete) {
    return (dispatch) => {
      return fetch('/api/goal', {
        method:'delete',
        headers:{'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body:JSON.stringify({goalDelete})
      }).then((response) => {
        if(response.ok){
        }
      });
    };
  }

// export function getGoal (userId) {
//   return (dispatch) => {
//     return fetch('/api/goal', {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'same-origin'
//     }).then((response) => {
//         if (response.ok) {
//           return response.json().then((json) => {
//             dispatch({
//               type: 'DISPLAY_GOAL_SUCCESS',
//               payload: Array.isArray(json) ? json : [json]
//             });
//           });
//         } else {
//           return response.json().then((json) => {
//             dispatch({
//               type: 'DISPLAY_GOAL_FAIL',
//               error: json
//             })
//           });
//         }
//       })
//     }
//   }
