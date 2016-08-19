export function uploadProgressVideoLink(userId, progress) {
  return fetch('/users/' + userId + '/progress-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      progress: progress
    }),
    credentials: 'same-origin'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then((json) => {
        return Promise.reject(json);
      });
    }
  });
}

export function uploadProgressImageLink(userId, progress) {
  return fetch('/users/' + userId + '/progress-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      progress: progress
    }),
    credentials: 'same-origin'
  }).then((response) => {
    if (response.ok) {
      return response.json().then((json) => {
        return json;
      });
    } else {
      return response.json().then((json) => {
        return Promise.reject(json);
      });
    }
  });
}