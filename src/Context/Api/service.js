export default class Api {
  authToken = null;
  eventTarget = new EventTarget();

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  fetch(path = ``, additionalOptions = {}, data) {
    return fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.authToken
      },
      body: data ? JSON.stringify(data) : data,
      ...additionalOptions
    })
      .then(res => {
        if (res.status >= 400 && res.status < 600) {
          return Promise.reject(res);
        }

        return res;
      })
      .catch(error => {
        error.text().then(text => {
          this.eventTarget.dispatchEvent(
            new CustomEvent('error', {
              detail: text ? JSON.parse(text) : {}
            })
          );
        });
      });
  }
}



