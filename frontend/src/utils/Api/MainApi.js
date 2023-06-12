class MainApi {
  constructor({ headers, baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _resToJSON(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  getInitialLikeMovie() {
    return fetch(`${this._baseUrl}movies`, {
      headers: this._headers,
    })
      .then(this._resToJSON)
       .then((respawns) => {return respawns.data})
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._resToJSON)
    .then((respawns) => {return respawns.data})
  }

  addLikeMovie(id) {
    return fetch(
      `${this._baseUrl}movies/` + id + "/likes",
      {
        method: "PUT",
        headers: this._headers,
      }
    )
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data})
  }

  removeLikeMovie(id) {
    return fetch(
      `${this._baseUrl}movies/` + id + "/likes",
      {
        method: "DELETE",
        headers: this._headers,
      }
    )
      .then(this._resToJSON)
      .then((respawns) => {return respawns.data})
  }

  setUserInfo(formvalue) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formvalue.name,
        email: formvalue.email,
      }),
    })
    .then(this._resToJSON)
    .then((respawns) => {return respawns.data});
  }

  changeAuthToken(token) {
    this._headers["authorization"] = `Bearer ${token}`;
  }
  
  signUp(name, email, password) {
    console.log(name, email, password)
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),

    }).then(this._resToJSON)
  }

  checkJwtToken(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._resToJSON)
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    .then(this._resToJSON)
  }
}

const mainApi = new MainApi({
  headers: {
    "Content-Type": "Application/JSON",
  },
  baseUrl: process.env.REACT_APP_API_URL,
});

export default mainApi;
