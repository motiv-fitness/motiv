export function displaySupplement(userId) {
    return fetch('/api/supplements', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            return Array.isArray(json) ? json : [json]
          });
        } else {
          return response.json().then((json) => {
            return json
          });
        }
      })
  }

  export function postSupplement(supplement,amount){
      return fetch('/api/supplements/', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({supplement,amount}),
        credentials: 'same-origin'
      }).then((response) => {
        return response;
      });
  }

  export function putSupplement(supplement,amount,id){
      return fetch('/api/supplements/', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({supplement,amount,id}),
        credentials: 'same-origin'
      }).then((response) => {
        if (response.ok) {
        }
      })
  }


  export function deleteSupplement(id){
      return fetch('/api/supplements/',{
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
