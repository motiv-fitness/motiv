export function displayExercise(userId) {
    return fetch('/api/regimes/exercise/' + userId, {
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
            console.error(json);
            return json;
          });
        }
      })
  }



export function displayDiet(userId) {
    return fetch('/api/regimes/diet/' + userId, {
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
            console.error(json);
            return json;
          });
       }
    })
}


export function deleteDiet(id){
    return fetch('/api/regimes/diet',{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:id}),
      credentials: 'same-origin'
    }).then((response) => {
      if (response.ok) {
      }else{
        return function(err){
        }
      }
    })
}


export function postDiet(label,name){
    return fetch('/api/regimes/diet', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name})
    }).then((response) => {
      if(response.ok){
      }
    });
}

export function putDiet(label,name,id){
    return fetch('/api/regimes/diet', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name,id})
    }).then((response) => {
      if(response.ok){
      }
    });
}

export function putExercise(label,name,id){
    return fetch('/api/regimes/exercise', {
      method:'PUT',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name,id})
    }).then((response) => {
      if(response.ok){
      }
    });
}

export function postExercise(label,name){
    return fetch('/api/regimes/exercise', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      credentials: 'same-origin',
      body:JSON.stringify({label,name})
    })
    .then((response) => {
        return response;
    })
    .catch((err) => {
    })
}

export function deleteExercise(id){
    return fetch('/api/regimes/exercise',{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:id}),
      credentials: 'same-origin'

    }).then((response) => {
      if (response.ok) {
      }else{
        return function(err){
        }
      }
    })
}
