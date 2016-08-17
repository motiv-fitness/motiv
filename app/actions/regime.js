export function displayExercise(userId) {
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_REGIMEEXERCISE_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_REGIMEEXERCISE_FAIL',
              error: json
            })
          });
        }
      })
    }
  }



export function displayDiet(userId) {
  return (dispatch) => {
    return fetch('/api/regimes/diet', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch({
              type: 'DISPLAY_REGIMEDIET_SUCCESS',
              payload: Array.isArray(json) ? json : [json]
            });
          });
        } else {
          return response.json().then((json) => {
            dispatch({
             type: 'DISPLAY_REGIMEDIET_FAIL',
            error: json
          })
       });
      }
    })
  }
}


export function deleteDiet(id){
  return (dispatch) => {
    return fetch('/api/regimes/diet',{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:id}),
      credentials: 'same-origin'

    }).then((response) => {
      if (response.ok) {
        console.log('id deleting')
      }else{
        return function(err){
          console.log(err,'we error')
        }
      }
    })
  }
}


export function postDiet(label,name){
  return (dispatch) => {
    return fetch('/api/regimes/diet', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name})
    }).then((response) => {
      if(response.ok){
        console.log("Post Diet is success")
      }
    });
  };
}

export function putDiet(label,name,id){
  return (dispatch) => {
    return fetch('/api/regimes/diet', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name,id})
    }).then((response) => {
      if(response.ok){
        console.log("Post Diet is success")
      }
    });
  };
}

export function putExercise(label,name,id){
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name,id})
    }).then((response) => {
      if(response.ok){
        console.log("Put Exercise is success")
      }
    });
  };
}






export function postExercise(label,name){
  return (dispatch) => {
    return fetch('/api/regimes/exercise', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name})
    }).then((response) => {
      if(response.ok){
        console.log("Post Exercise is success")
      }
    });
  };
}

export function deleteExercise(id){
  return (dispatch) => {
    return fetch('/api/regimes/exercise',{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:id}),
      credentials: 'same-origin'

    }).then((response) => {
      if (response.ok) {
        console.log('id deleting')
      }else{
        return function(err){
          console.log(err,'we error')
        }
      }
    })
  }
}
