import 'whatwg-fetch'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}

function getFn (url, bodyOnly = true, headers = {}) {
  const promise = fetch(url, {
    method: 'GET',
    headers:headers
  }).then(checkStatus);

  if (bodyOnly) {
    return promise.then(response => response.json())
  } else {
    return promise.then(response => ({
      headers: response.headers,
      body: response.json()
    }))
  }
}

const extractBody = response => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json()
  }
  return response.text()
};

function postFn (url, body, bodyOnly = true) {
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(checkStatus);

  if (bodyOnly) {
    return promise.then(response => extractBody(response))
  } else {
    return promise.then(response => ({
      headers: response.headers,
      body: extractBody(response)
    }))
  }
}
function putFn (url, body, bodyOnly = true, headers ={}) {
  console.log(headers);
  const promise = fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(body)
  }).then(checkStatus);

  if (bodyOnly) {
    return promise.then(response => extractBody(response))
  } else {
    return promise.then(response => ({
      headers: response.headers,
      body: extractBody(response)
    }))
  }
}
function uploadFn (url, body, bodyOnly = true) {
  let data = new FormData();
  for (const file of body) {
    data.append('user',file.file)
  }
  const promise = fetch(url, {
    method: 'POST',
    headers: {
    },
    body: data
  }).then(checkStatus);

  if (bodyOnly) {
    return promise.then(response => extractBody(response))
  } else {
    return promise.then(response => ({
      headers: response.headers,
      body: extractBody(response)
    }))
  }
}

function deleteFn (url) {
  return fetch(url, {
    method: 'DELETE'
  }).then(checkStatus)
}

export default {
  get: getFn,
  post: postFn,
  put: putFn,
  delete: deleteFn,
  upload: uploadFn
}
