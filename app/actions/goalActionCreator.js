export function goal(benchGoal) {
  console.log("inside goal dispatch", benchGoal)
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/api/goal/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        benchGoal: benchGoal
      }),
      credentials: 'same-origin'
    }).then((response) => {
      console.log("This is the response", response)
      if (response.ok) {
        return response.json()
        .then((json) => {
          dispatch({
            type: 'DISPLAY_GOAL_SUCCESS',
            token: json.token,
            user: json.user
          });
          cookie.save('token',json.token, { expires: moment().add(1, 'hour').toDate() });
          browserHistory.push('/account');
        });
      } else {
        return response.json()
        .then((json) => {
          dispatch({
            type: 'DISPLAY_GOAL_FAIL',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
