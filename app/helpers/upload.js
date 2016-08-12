export function uploadProgressVideoLink(link) {
  return fetch('/api/links/progress-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      link: link
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